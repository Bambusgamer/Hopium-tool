import { type ParsedStation, type FuelingEvent, type DownTime, type PlanningPhase, FuelType } from "types";
import type { Response } from "./requestH2LiveLists";
import parseFuelingEvent from "parsers/fuelingEvent";
import parseDownTime from "parsers/downTime";
import parsePlanningPhase from "parsers/PlanningPhase";


export default function compileStatuslist(statuslists: Response['statuslist'], masterlist: Map<string, ParsedStation>): {
    fuelingEvents: FuelingEvent[];
    downTimes: DownTime[];
    planningPhases: PlanningPhase[];
} {
    const events: {
        fuelingEvents: FuelingEvent[];
        downTimes: DownTime[];
        planningPhases: PlanningPhase[];
    } = {
        fuelingEvents: [],
        downTimes: [],
        planningPhases: []
    };

    for (const key of Object.keys(statuslists)) {
        for (const status of statuslists[key as keyof Response['statuslist']]) {
            if (!status.idx || typeof status.idx !== 'string') continue;

            const fuelingEvent = parseFuelingEvent(status, key as FuelType, masterlist.get(status.idx));
            if (fuelingEvent) events.fuelingEvents.push(fuelingEvent);

            const downTime = parseDownTime(status, key as FuelType);
            if (downTime) events.downTimes.push(downTime);

            const planningPhase = parsePlanningPhase(status, key as FuelType, masterlist.get(status.idx));
            if (planningPhase) events.planningPhases.push(planningPhase);
        }
    }

    return events;
}