import ICoordinates from '../../models/ICoordinates';
import Optional from '../../models/Optional';

interface ILocationData {
    zipCode: string;
    coordinates: ICoordinates;
    radius: number;
}

export default class LocationManager {
    private static readonly _localStorageBaseKey = '__locationManager:';
    private static readonly _localStorageDataKey = 'locationData';

    private _locationData: ILocationData;

    constructor() {
        this._locationData = this._getFromLocalStorage();
    }

    get isLocationSet(): boolean {
        return this._locationData != null;
    }

    private _getFromLocalStorage() {
        const key = LocationManager._localStorageBaseKey + LocationManager._localStorageDataKey;
        const value = window.localStorage.getItem(key);

        if (value) {
            return JSON.parse(value);
        }

        return null;
    }

    private _updateLocalStorage() {
        if (!this._locationData) {
            return;
        }

        const key = LocationManager._localStorageBaseKey + LocationManager._localStorageDataKey;
        window.localStorage.setItem(key, JSON.stringify(this._locationData));
    }

    private async _getCoordinatesFromNavigator(): Promise<Optional<ICoordinates>> {
        return new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition(
                result => resolve({ latitude: result.coords.latitude, longitude: result.coords.longitude }),
                e => reject(e)
            );
        });
    }

    public async updateZipCode({zipCode, radius}: {zipCode: number, radius: number}): Promise<void> {

    }
}