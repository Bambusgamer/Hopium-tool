import { type ParsedStation, type FuelingEvent, type DownTime } from "types";
import mongoose from "mongoose";
import { StationSchema, FuelingEventSchema, DownTimeSchema } from "models";
import dotenv from "dotenv";

/**
 * Insert the data into the database
 * @param data data to insert
 */
export default async function insertData(data: {
    stations: Map<string, ParsedStation>,
    fuelingEvents: FuelingEvent[],
    downTimes: DownTime[]
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
    await insertDownTimes(connection, data.downTimes);

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
 * @param downTimes down times to update
 * @param DownTime model to use
 */
async function insertDownTimes(connection: mongoose.Connection, downTimes: DownTime[]) {
    const DownTime = connection.model('DownTime', DownTimeSchema);

    const recentStoredDownTimes = await DownTime.find({
        stationId: { $in: downTimes.map(downTime => downTime.stationId) }
    }).sort({ end: -1 });

    const ops = [];

    for (const downTime of downTimes) {
        const mostRecentStoredDownTime = recentStoredDownTimes.find(storedDownTime => storedDownTime.stationId === downTime.stationId && storedDownTime.fuelType === downTime.fuelType);

        if (!mostRecentStoredDownTime) ops.push({ insertOne: { document: downTime } });
        else {
            if (Date.now() - mostRecentStoredDownTime.startUnix > 1000 * 60 * 60) {
                if (Math.abs(downTime.startUnix - mostRecentStoredDownTime.startUnix) < 1000 * 60 * 60)
                    ops.push({
                        updateOne: {
                            filter: { _id: mostRecentStoredDownTime._id },
                            update: {
                                $set: {
                                    end: downTime.end,
                                    reason: downTime.reason,
                                    duration: Math.floor((Date.now() - mostRecentStoredDownTime.startUnix) / 1000 / 60)
                                }
                            }
                        }
                    });
                else
                    ops.push({ insertOne: { document: downTime } });
            } else {
                ops.push({
                    updateOne: {
                        filter: { _id: mostRecentStoredDownTime._id },
                        update: {
                            $set: {
                                end: downTime.end,
                                reason: downTime.reason,
                                duration: Math.floor((Date.now() - mostRecentStoredDownTime.startUnix) / 1000 / 60)
                            }
                        }
                    }
                });
            }
        }
    }

    await DownTime.bulkWrite(ops);
}