import axios from 'axios'

type GetTeamsForCompetitionResponse = {
    teams: {
        id: number,
        name: string,
        venue: string,
        address: string,
        crest: string,
    }[];
}

export type Stadium = {
    id: number;
    name: string;
    teamName: string;
    postcode: string;
    fullAddress: string;
    crestUrl: string;
}

export class StadiumService {
    private readonly COMPETITION_ID = "2021";
    private readonly FOOTBALL_DATA_API_TOKEN = "f3898bd7f4c548b88bb666406691ecb7";

    async getAllStadiums(): Promise<Stadium[]> {
        //TODO These aren't stadiums, they're teams
        //TODO Add note explaining solutions to localhost:8100 situation
        const response = await axios.get<GetTeamsForCompetitionResponse>(
            `http://localhost:8010/proxy/v4/competitions/${this.COMPETITION_ID}/teams`,
            {
                headers: {
                    "X-Auth-Token": this.FOOTBALL_DATA_API_TOKEN,
                }
            }
        );

        //TODO error handling
        return StadiumService.buildStadiumsFromFootballDataResponse(response.data);
    }

    static buildStadiumsFromFootballDataResponse({teams}: GetTeamsForCompetitionResponse): Stadium[] {
        return teams.map(({id, name, venue, address, crest,}): Stadium => {
            //INFO: addresses have the format of "The street address POST CODE" where the
            //last two "words" will always be the postcode
            const addressAsWords = address.split(" ");
            const postcode = addressAsWords.splice(addressAsWords.length - 2, 2).join(" ");

            return {
                id,
                name: venue,
                teamName: name,
                crestUrl: crest,
                fullAddress: address,
                postcode,
            }
        });
    }
}