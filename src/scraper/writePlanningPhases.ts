import { type ParsedStation, type PlanningPhase, FuelType } from 'types';

/**
 * Adds the planning phase progress to the station.
 * @param masterlist The masterlist of stations
 * @param planningPhases The planning phases to add
 * @returns The updated masterlist
 */
export default function writePlanningPhases(masterlist: Map<string, ParsedStation>, planningPhases: PlanningPhase[]): Map<string, ParsedStation> {
    for (const phase of planningPhases) {
        const station = masterlist.get(phase.stationId);
        if (!station) continue;

        if (phase.fuelType === FuelType.P700_SMALL) {
            station.planning[FuelType.P700_SMALL] = 'planned';
        } else if (phase.fuelType === FuelType.P350_SMALL) {
            station.planning[FuelType.P350_SMALL] = 'planned';
        } else if (phase.fuelType === FuelType.P350_LARGE) {
            station.planning[FuelType.P350_LARGE] = 'planned';
        }
    }

    return masterlist;
}