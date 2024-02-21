import { type StationStatus, type ParsedStation, type PlanningPhase, FuelType, StatusMessage } from 'types';
import trimString from 'parsers/trimString';


/**
 * Parses a stations status and returns a PlanningPhase if the status indicates that the station is in a planning phase.
 * @param status The status to parse
 * @param fuelType The fuel type of the status
 * @param station The station to which the status belongs
 * @returns The parsed PlanningPhase or null if the status is not a PlanningPhase
 */
export default function parsePlanningPhase(status: StationStatus, fuelType: FuelType, station?: ParsedStation): PlanningPhase | null {
    if (!status.combinedstatus || status.combinedstatus !== StatusMessage.PLANNED) return null;

    return {
        stationId: trimString(status.idx),
        fuelType: fuelType
    }
}
