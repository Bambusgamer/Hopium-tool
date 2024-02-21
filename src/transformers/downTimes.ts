import { type DownTime } from 'types';
import generateCSV from 'transformers/csv';

/**
 * Generates a CSV string from an array of down times
 * @param downTimes array of down times
 * @returns CSV string
 */
export default function generateDownTimesCSV(downTimes: DownTime[]): string {
    return generateCSV(
        ['stationId', 'startTime', 'endTime', 'fuelType', 'duration', 'reason'],
        downTimes.map(downtime => [
            downtime.stationId,
            downtime.start,
            downtime.end,
            downtime.fuelType,
            downtime.duration,
            downtime.reason
        ])
    )
}