export enum FuelType {
    P700_SMALL = 'P700_SMALL',
    P350_SMALL = 'P350_SMALL',
    P350_LARGE = 'P350_LARGE'
};

export const FuelTypes = [FuelType.P700_SMALL, FuelType.P350_SMALL, FuelType.P350_LARGE];

export enum StatusMessage {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    PERMCLOSED = 'PERMCLOSED',
    EXCEPTION = 'EXCEPTION',
    PLANNED = 'PLANNED'
}

export interface ParsedStation {
    id: string;
    name: string;
    operator: string;
    location: {
        postalCode: number;
        city: string;
        country: string;
        longitude: number;
        latitude: number;
        street: string;
        streetNumber: string;
    };
    fuelTypes: FuelType[];
    prices: {
        [key in FuelType]?: {
            currency: string;
            amount: number;
        };
    };
    planning: {
        [key in FuelType]?: 'planned' | 'complete';
    };
};

export interface FuelingEvent {
    stationId: string;
    fuelType: FuelType;
    amount: number;
    price: {
        currency: string;
        amount: number;
    };
    timestamp: string;
    unix: number;
};

export interface DownTime {
    stationId: string;
    fuelType: FuelType;
    start: string;
    startUnix: number;
    end: string;
    duration: number;
    reason: string;
}

export interface PlanningPhase {
    stationId: string;
    fuelType: FuelType;
}

/**
 * Their API is very inconsistent. All values should be considered as nullable and optional.
 */

/**
 * Response returned by /v1/fuelstation/statuslist
 */
export interface StatusResponse {
    fuelstation: StationStatus[];
}

export interface StationStatus {
    activity_message: string | null;
    combinedremark: string | null;
    combinedstatus: string | null;
    idx: string | null;
    openinghours_nextchange_message: string | null;
    status_unknown: boolean | null;
}

/**
 * Response returned by /v1/fuelstation/masterlist
 */
export interface MasterResponse {
    fuelstation: Station[];
}

export interface Station {
    city: string | null;
    countryshortname: string | null;
    date_commissioning_message: string | null;
    enable_mobile_refueling: 't' | 'f' | null;
    funding: string | null;
    fundinginfo: string | null;
    fundinglogo: string | null;
    fundingpage: string | null;
    greenh2: 't' | 'f' | null;
    has_350_large: 't' | 'f' | null;
    has_350_small: 't' | 'f' | null;
    has_700_small: 't' | 'f' | null;
    has_utilization_data: 't' | 'f' | null;
    hostname: string | null;
    idx: string | null;
    image: string | null;
    latitude: string | null;
    longitude: string | null;
    name: string | null;
    opening_hours: string | null;
    operatorhotline: string | null;
    operatorname: string | null;
    // i dont wanna type these bull shit objects returned by the api. what is this naming convention anyways???? happy mix????
    paymenttypes: any[] | null;
    price_message: string | null;
    progress_description: string | null;
    progress_extratext: string | null;
    progress_percent: string | null;
    street: string | null;
    streetnr: string | null;
    zip: string | null;
}