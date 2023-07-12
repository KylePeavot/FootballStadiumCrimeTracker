import {LocationService} from "./location.service";

describe('LocationService', function () {
    const locationService = new LocationService();

    describe('getCoordinatesFromPostcode', function () {
        it('should return coordinates for a valid postcode', async function () {
            //Given
            const thePostcode = 'N5 1BU';

            //When
            const coordinatesForPostcode = await locationService.getCoordinatesFromPostcode(thePostcode);

            //Then
            expect(coordinatesForPostcode).toStrictEqual({
                latitude: 51.556667,
                longitude: -0.106371,
            })
        });

        it('should return null for an invalid postcode', async function () {
            //Given
            const anInvalidPostcode = 'ABC DEF';

            //When
            const coordinatesThatShouldBeNull = await locationService.getCoordinatesFromPostcode(anInvalidPostcode);

            //Then
            expect(coordinatesThatShouldBeNull).toBeNull();
        });
    });
});