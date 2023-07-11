import {StadiumService} from "./stadium.service";

describe('Stadium Service', function () {
    const stadiumService = new StadiumService();

    describe('getAllStadiums', function () {
        it('should get a list of stadiums', async function () {
            //When
            const stadiums = await stadiumService.getAllStadiums();

            //Then
            expect(stadiums).toStrictEqual([]);
        });
    });
});