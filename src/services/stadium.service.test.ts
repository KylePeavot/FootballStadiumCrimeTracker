import {StadiumService} from "./stadium.service";

describe('Stadium Service', function () {
    const stadiumService = new StadiumService();

    describe('getAllStadiums', function () {
        it('should get a list of stadiums', async function () {
            //When
            const stadiums = await stadiumService.getAllStadiums();

            //Then
            const theArsenalStadium = stadiums.find((stadium) => stadium.id === 57);
            expect(theArsenalStadium).toStrictEqual(
                {
                    id: 57,
                    name: 'Emirates Stadium',
                    postcode: 'N5 1BU',
                    fullAddress: '75 Drayton Park London N5 1BU',
                    crestUrl: 'https://crests.football-data.org/57.png',
                },
            );
        });
    });
});