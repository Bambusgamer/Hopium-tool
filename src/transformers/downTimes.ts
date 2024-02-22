import { type Downtime } from 'utils/types';
import generateCSV from 'transformers/csv';

/**
 * Generates a CSV string from an array of down times
 * @param downtimes array of down times
 * @returns CSV string
 */
export default function generateDowntimesCSV(downtimes: Downtime[]): string {
    return generateCSV(
        ['stationId', 'startTime', 'endTime', 'fuelType', 'duration', 'reason'],
        downtimes.map(downtime => [
            downtime.stationId,
            downtime.start,
            downtime.end,
            downtime.fuelType,
            downtime.duration,
            downtime.reason
        ])
    )
}