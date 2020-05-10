import axios from 'axios';
import hereApiConfig from '../../config/hereApiConfig';

interface ICoordinates {
    lat: number;
    long: number;
}

export default class GeocodeApi {
    constructor(private readonly _token: string) {

    }

    async zipCodeToCoordinates(zipCode: string): Promise<ICoordinates> {
        const url = hereApiConfig.url(
            hereApiConfig.services.geocode,
            hereApiConfig.endpoints.geocode,
            { [hereApiConfig.params.geocode.query]: zipCode });

        const headers = hereApiConfig.headers(this._token);

        try {
            const request = await axios.get(url, { headers });
            const positionRaw = request.data.items[0].position;
            return {
                lat: positionRaw.lat,
                long: positionRaw.lng
            };
        } catch (e) {
            throw e;
        }
    }
}