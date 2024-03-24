import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import { DowntimeSchema } from 'utils/models';
import { HydratedDowntime } from 'utils/models';
import { Downtime } from '../utils/types';

if (!process.env.MONGO_URI) throw new Error('MONGO_URI not set');

const connection = mongoose.createConnection(process.env.MONGO_URI);

const Downtime = connection.model('Downtimes2', DowntimeSchema);

const Downtime2 = connection.model('Downtimes3', DowntimeSchema);

let duplicateFree: HydratedDowntime[] = [];

function station(doc: HydratedDowntime) {
    return (_doc: HydratedDowntime) => _doc.stationId === doc.stationId && _doc.fuelType === doc.fuelType;
}

const duplicates: string[] = [];

void Downtime.find({}).then(
    async docs => {
        // add the endUnix field to the documents
        docs = docs.map(doc => {
            doc.endUnix = dateBuilder(doc.end).getTime();
            return doc;
        });

        for (const doc of docs) {
            if (duplicates.includes(String(doc._id))) continue;
            const obviousDuplicate = docs.filter(_doc => station(doc)(_doc) && _doc.startUnix === doc.startUnix);

            obviousDuplicate.forEach(_doc => duplicates.push(String(_doc._id)));

            if (obviousDuplicate.length > 1) {
                const sorted = obviousDuplicate.sort((a, b) => a.endUnix - b.endUnix);
                const last = sorted.pop();
                if (last) duplicateFree.push(last);
            } else {
                duplicateFree.push(doc);
            }
        }

        const highToLow = duplicateFree.sort((a, b) => b.endUnix - a.endUnix);

        duplicateFree = cleaner(highToLow);

        console.log('Total:', docs.length);
        console.log('Duplicates:', duplicates.length);
        console.log('Duplicate free:', duplicateFree.length);

        await Downtime2.deleteMany({});
        await Downtime2.insertMany(duplicateFree);
    })

function cleaner(docs: HydratedDowntime[]): HydratedDowntime[] {
    if (docs.length === 0) return [];

    const [doc, ...rest] = docs;

    const { docs: cleaned, extracted } = duplicateCleaner(rest, doc);

    return [extracted, ...cleaner(cleaned)];
}

function duplicateCleaner(docs: HydratedDowntime[], doc: HydratedDowntime): {
    docs: HydratedDowntime[];
    extracted: HydratedDowntime;
} {
    const extracted = docs.findIndex(_doc => station(doc)(_doc) && Math.abs(_doc.endUnix - doc.endUnix) < 1000 * 60 * 15);

    if (extracted === -1) {
        return { docs, extracted: doc };
    }

    const extractedDoc = docs[extracted];

    doc.startUnix = Math.min(doc.startUnix, extractedDoc.startUnix);
    doc.start = doc.startUnix === extractedDoc.startUnix ? extractedDoc.start : doc.start;

    return duplicateCleaner(docs.filter((_doc, i) => i !== extracted), doc);
}

function dateBuilder(dateString: string): Date {
    const date = new Date();

    const [datePart, timePart] = dateString.split(', ');

    const [day, month, year] = datePart.split('.').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

