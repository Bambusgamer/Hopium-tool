import { type ParsedStation, type FuelingEvent, type Downtime, type PlanningPhase, FuelType } from "utils/types";
import type { Response } from "scraper/requestH2LiveLists";
import parseFuelingEvent from "parsers/fuelingEvent";
import parseDowntime from "parsers/downtime";
import parsePlanningPhase from "parsers/planningPhase";


export default function compileStatuslist(statuslists: Response['statuslist'], masterlist: Map<string, ParsedStation>): {
    fuelingEvents: FuelingEvent[];
    downtimes: Downtime[];
    planningPhases: PlanningPhase[];
} {
    const events: {
        fuelingEvents: FuelingEvent[];
        downtimes: Downtime[];
        planningPhases: PlanningPhase[];
    } = {
        fuelingEvents: [],
        downtimes: [],
        planningPhases: []
    };

    for (const key of Object.keys(statuslists)) {
        for (const status of statuslists[key as keyof Response['statuslist']]) {
            if (!status.idx || typeof status.idx !== 'string') continue;

            const fuelingEvent = parseFuelingEvent(status, key as FuelType, masterlist.get(status.idx));
            if (fuelingEvent) events.fuelingEvents.push(fuelingEvent);

            const downtime = parseDowntime(status, key as FuelType);
            if (downtime) events.downtimes.push(downtime);

            const planningPhase = parsePlanningPhase(status, key as FuelType, masterlist.get(status.idx));
            if (planningPhase) events.planningPhases.push(planningPhase);
        }
    }

    return events;
}