import axios from "axios";

type GetLocationForPostcodeResponse = {
    result: {
        latitude: number,
        longitude: number,
    }
}

export type Coordinates = {
    latitude: number,
    longitude: number,
}

export class LocationService {
    async getCoordinatesFromPostcode(postcode: string): Promise<Coordinates | null> {

        try {
            const response = await axios.get<GetLocationForPostcodeResponse>(`http://localhost:8011/proxy/postcodes/${postcode}`);

            return {
                latitude: response.data.result.latitude,
                longitude: response.data.result.longitude,
            }
        } catch (e) {
            console.error({
                message: `error encountered in LocationService::getCoordinatesFromPostcode`,
                params: {postcode},
                error: e,
            });

            return null;
        }
    }
}