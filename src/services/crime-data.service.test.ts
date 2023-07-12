import type {Coordinates} from "./location.service";
import {CrimeDataService} from "./crime-data.service";

describe('CrimeDataService', function () {
    const crimeDataService = new CrimeDataService();

    describe('getCrimeDataForCoordinates', function () {
        it('should get crime data for given coordinates', async function () {
            //Given
            const theCoordinates: Coordinates = {
                latitude: 51.556667,
                longitude: -0.106371,
            }

            //When
            const response = await crimeDataService.getCrimeDataForCoordinates(theCoordinates);

            //Then
            expect(response).toStrictEqual([
                {
                    "dateOfCrime": new Date('2023-05'),
                    "prettyCategory": "Anti social behaviour",
                },
                {
                    "dateOfCrime": new Date('2023-05'),
                    "prettyCategory": "Anti social behaviour",
                },
                {
                    "dateOfCrime": new Date('2023-05'),
                    "prettyCategory": "Burglary",
                },
            ])
        });
    });
});