import { type ParsedStation, type FuelingEvent, type Downtime } from "utils/types";
import mongoose from "mongoose";
import { StationSchema, FuelingEventSchema, DowntimeSchema } from "utils/models";
import dotenv from "dotenv";

/**
 * Insert the data into the database
 * @param data data to insert
 */
export default async function insertData(data: {
    stations: Map<string, ParsedStation>,
    fuelingEvents: FuelingEvent[],
    downtimes: Downtime[]
}) {
    dotenv.config();

    if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set');

    const connection = mongoose.createConnection(process.env.MONGO_URI);

    const Station = connection.model('Station', StationSchema);

    const stations = Array.from(data.stations.values());

    await Station.bulkWrite(stations.map(station => ({
        updateOne: {
            filter: { id: station.id },
            update: {
                $set: station
            },
            upsert: true
        }
    })));

    await insertFuelingEvents(connection, data.fuelingEvents);
    await insertDowntimes(connection, data.downtimes);

    connection.close();
}

/**
 * Update the fueling events
 * @param fuelingEvents fueling events to update
 * @param FuelingEvent model to use
 */
async function insertFuelingEvents(connection: mongoose.Connection, fuelingEvents: FuelingEvent[]) {
    const FuelingEvent = connection.model('FuelingEvent', FuelingEventSchema);

    const recentEvents = fuelingEvents.filter(event => event.unix > Date.now() - 1000 * 60 * 50);

    const recentStoredEvents = await FuelingEvent.find({
        stationId: { $in: recentEvents.map(event => event.stationId) },
        unix: { $gt: Date.now() - 1000 * 60 * 50 }
    }).sort({ unix: -1 });

    const toInsert: FuelingEvent[] = [];

    for (const event of recentEvents) {
        const mostRecentStoredEvent = recentStoredEvents.find(storedEvent => storedEvent.stationId === event.stationId && storedEvent.fuelType === event.fuelType);

        if (!mostRecentStoredEvent || event.unix > mostRecentStoredEvent.unix && Math.abs(event.unix - mostRecentStoredEvent.unix) > 1000 * 60 * 3) {
            toInsert.push(event);
        }
    }

    await FuelingEvent.insertMany(toInsert);
}

/**
 * Update the down times
 * @param downtimes down times to update
 * @param Downtime model to use
 */
async function insertDowntimes(connection: mongoose.Connection, downtimes: Downtime[]) {
    const Downtime = connection.model('Downtime', DowntimeSchema);

    const recentStoredDowntimes = await Downtime.find({
        stationId: { $in: downtimes.map(downtime => downtime.stationId) }
    }).sort({ end: -1 });

    const ops = [];

    for (const downtime of downtimes) {
        const mostRecentStoredDowntime = recentStoredDowntimes.find(storedDowntime => storedDowntime.stationId === downtime.stationId && storedDowntime.fuelType === downtime.fuelType);

        if (!mostRecentStoredDowntime) ops.push({ insertOne: { document: downtime } });
        else {
            if (Date.now() - mostRecentStoredDowntime.startUnix > 1000 * 60 * 60) {
                if (Math.abs(downtime.startUnix - mostRecentStoredDowntime.startUnix) < 1000 * 60 * 60)
                    ops.push({
                        updateOne: {
                            filter: { _id: mostRecentStoredDowntime._id },
                            update: {
                                $set: {
                                    end: downtime.end,
                                    reason: downtime.reason,
                                    duration: Math.floor((Date.now() - mostRecentStoredDowntime.startUnix) / 1000 / 60)
                                }
                            }
                        }
                    });
                else
                    ops.push({ insertOne: { document: downtime } });
            } else {
                ops.push({
                    updateOne: {
                        filter: { _id: mostRecentStoredDowntime._id },
                        update: {
                            $set: {
                                end: downtime.end,
                                reason: downtime.reason,
                                duration: Math.floor((Date.now() - mostRecentStoredDowntime.startUnix) / 1000 / 60)
                            }
                        }
                    }
                });
            }
        }
    }

    await Downtime.bulkWrite(ops);
}