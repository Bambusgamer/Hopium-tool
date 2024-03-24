import { Schema, type Model, type Connection, SchemaTypes, type Types, type HydratedDocument } from 'mongoose';

import type { ParsedStation, FuelingEvent, Downtime } from 'utils/types';

/**
 * Model that represents a fueling station
 */
export type StationModel = Model<ParsedStation>;

export type HydratedStation = HydratedDocument<ParsedStation>;

export const StationSchema = new Schema<ParsedStation, StationModel>({
    id: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    operator: {
        type: SchemaTypes.String,
        required: true
    },
    location: {
        postalCode: {
            type: SchemaTypes.Number,
            required: true
        },
        city: {
            type: SchemaTypes.String,
            required: true
        },
        country: {
            type: SchemaTypes.String,
            required: true
        },
        longitude: {
            type: SchemaTypes.Number,
            required: true
        },
        latitude: {
            type: SchemaTypes.Number,
            required: true
        },
        street: {
            type: SchemaTypes.String,
            required: true
        },
        streetNumber: {
            type: SchemaTypes.String,
            required: true
        }
    },
    fuelTypes: {
        type: [SchemaTypes.String],
        required: true
    },
    prices: {
        type: SchemaTypes.Map,
        of: {
            currency: {
                type: SchemaTypes.String,
                required: true
            },
            amount: {
                type: SchemaTypes.Number,
                required: true
            }
        },
        required: true
    },
    planning: {
        type: SchemaTypes.Map,
        of: {
            type: SchemaTypes.String,
            enum: ['planned', 'complete'],
            required: true
        },
        required: true
    }
});

/**
 * Model that represents a fueling event
 */
export type FuelingEventModel = Model<FuelingEvent>;

export type HydratedFuelingEvent = HydratedDocument<FuelingEvent>;

export const FuelingEventSchema = new Schema<FuelingEvent, FuelingEventModel>({
    stationId: {
        type: SchemaTypes.String,
        required: true
    },
    fuelType: {
        type: SchemaTypes.String,
        required: true
    },
    amount: {
        type: SchemaTypes.Number,
        required: true
    },
    price: {
        currency: {
            type: SchemaTypes.String,
            required: true
        },
        amount: {
            type: SchemaTypes.Number,
            required: true
        }
    },
    timestamp: {
        type: SchemaTypes.String,
        required: true
    },
    unix: {
        type: SchemaTypes.Number,
        required: true
    }
});


/**
 * Model that represents a downtime
 */
export type DowntimeModel = Model<Downtime>;

export type HydratedDowntime = HydratedDocument<Downtime>;

export const DowntimeSchema = new Schema<Downtime, DowntimeModel>({
    stationId: {
        type: SchemaTypes.String,
        required: true
    },
    fuelType: {
        type: SchemaTypes.String,
        required: true
    },
    start: {
        type: SchemaTypes.String,
        required: true
    },
    startUnix: {
        type: SchemaTypes.Number,
        required: true
    },
    end: {
        type: SchemaTypes.String,
        required: true
    },
    endUnix: {
        type: SchemaTypes.Number,
        required: true
    },
    duration: {
        type: SchemaTypes.Number,
        required: true
    },
    reason: {
        type: SchemaTypes.String,
        required: true
    }
});