import axios from 'axios'

type GetTeamsForCompetitionResponse = {
    teams: {
        id: number,
        venue: string,
        address: string,
        crest: string,
    }[];
}

export type Stadium = {
    id: number;
    name: string;
    postcode: string;
    fullAddress: string;
    crestUrl: string;
}

export class StadiumService {
    private readonly COMPETITION_ID = "2021";
    private readonly FOOTBALL_DATA_API_TOKEN = "f3898bd7f4c548b88bb666406691ecb7";

    async getAllStadiums(): Promise<Stadium[]> {
        const stadiumsFromApi = await axios.get<GetTeamsForCompetitionResponse>(
            `http://api.football-data.org/v4/competitions/${this.COMPETITION_ID}/teams`,
            {
                headers: {
                    "X-Auth-Token": this.FOOTBALL_DATA_API_TOKEN,
                }
            }
        );

        //TODO error handling
        return StadiumService.buildStadiumsFromFootballDataResponse(stadiumsFromApi.data);
    }

    static buildStadiumsFromFootballDataResponse({teams}: GetTeamsForCompetitionResponse): Stadium[] {
        return teams.map(({id, venue, address, crest,}): Stadium => {
            //INFO: addresses have the format of "The street address POST CODE" where the
            //last two "words" will always be the postcode
            const addressAsWords = address.split(" ");
            const postcode = addressAsWords.splice(addressAsWords.length - 2, 2).join(" ");

            return {
                id,
                name: venue,
                crestUrl: crest,
                fullAddress: address,
                postcode,
            }
        });
    }
}