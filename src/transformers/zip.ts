import JSZip from 'jszip';

/**
 * Create a zip file from the given streams
 * @param files The files to include in the zip
 * @returns A readable stream of the zip file
 */
export default function createZip(files: {
    stations: string,
    fuelingEvents: string,
    downtimes: string
}): NodeJS.ReadableStream {
    const zip = new JSZip();

    zip.file('stations.csv', files.stations);
    zip.file('fuelingEvents.csv', files.fuelingEvents);
    zip.file('downTimes.csv', files.downtimes);

    return zip.generateNodeStream({
        type: 'nodebuffer',
        streamFiles: true
    });
}