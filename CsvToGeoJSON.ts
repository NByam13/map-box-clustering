import csv from 'csvtojson';
import fs from 'fs';
import { Geometry } from 'geojson';

export interface Feature {
    type: 'Feature'
    id?: string | number
    geometry: Geometry
    properties: Record<string, string|number>
}

type RowData = {
    tenant_id: string;
    tenant: string;
    classification: string;
    classification_id: string;
    tenant_status: string;
    longitude: string;
    latitude: string;
};

csv()
    .fromFile('./raw.csv')
    .then((data) => {
        const geoJSON = data.map((row: RowData): Feature => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(row.longitude), parseFloat(row.latitude)],
                },
                properties: {
                    tenant_id: Number(row.tenant_id),
                    tenant: row.tenant,
                    tenant_status: row.tenant_status,
                    classification: row.classification,
                    classification_id: Number(row.classification_id),
                },
            };
        });

        const outputFile = fs.createWriteStream('./data.geojsonld');
        geoJSON.forEach((feature) => {
            const jsonData = JSON.stringify(feature) + '\n';
            outputFile.write(jsonData);
        });
    });
