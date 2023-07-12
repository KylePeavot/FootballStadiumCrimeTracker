import axios from 'axios'
import type {Coordinates} from "./location.service";
import {initCap} from "../utils/string.service";

const categoryToPrettyCategoryMapper = {
}

type GetCrimeDataForCoordinatesResponseItem = {
    month: string;
    category: string;
}

export type CrimeData = {
    dateOfCrime: Date,
    prettyCategory: string,
}

export class CrimeDataService {
    async getCrimeDataForCoordinates({latitude, longitude}: Coordinates): Promise<CrimeData[]> {
        //TODO Add comment to package.json describing necessity (CORS causing problem because of frontend only project, local proxy server required

            const response = await axios.get<GetCrimeDataForCoordinatesResponseItem[]>(
                `http://localhost:8012/proxy/api/crimes-at-location?lat=${latitude}&lng=${longitude}`,
            );

            return CrimeDataService.buildCrimeDataFromResponse(response.data);

            //TODO Error logging
    }

    static buildCrimeDataFromResponse(response: GetCrimeDataForCoordinatesResponseItem[]): CrimeData[] {
        return response.map(({ month, category}) => {
            const dateOfCrime = new Date(month);
            const prettyCategory = initCap(category.split('-').join(' '));

            return {
                dateOfCrime,
                prettyCategory,
            }
        })
    }
}