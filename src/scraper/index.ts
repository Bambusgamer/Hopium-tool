import scrapeToken from 'scraper/scrapeToken';
import requestH2LiveLists from 'scraper/requestH2LiveLists';
import compileMasterlist from 'scraper/compileMasterlist';
import compileStatuslist from 'scraper/compileStatuslist';
import writePlanningPhases from './writePlanningPhases';
import insertData from 'scraper/insertData';

/**
 * Scrapes data about fuel stations from the h2.live API
 * @returns object containing the compiled data
 * @throws error if the scraping process fails
 */
export default async function scrapeH2LiveData() {
    try {
        console.info('Scraping h2.live data');
        const token = await scrapeToken();

        const {
            masterlist,
            statuslist
        } = await requestH2LiveLists(token);

        const compiledMasterlist = compileMasterlist(masterlist);
        const compiledStatuslist = compileStatuslist(statuslist, compiledMasterlist);

        const masterlistWithPlanningPhases = writePlanningPhases(compiledMasterlist, compiledStatuslist.planningPhases);

        await insertData({
            stations: masterlistWithPlanningPhases,
            fuelingEvents: compiledStatuslist.fuelingEvents,
            downTimes: compiledStatuslist.downTimes
        })
    } catch (error) {
        console.error(error);
    }
}