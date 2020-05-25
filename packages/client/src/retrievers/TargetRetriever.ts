import axios from 'axios';
import { IStockRetrieverResult } from '../models/IStockResult';
import StockType from '../models/StockType';
import StockRetriever from './StockRetriever';

enum AvailabilityStatus {
    outOfStock = 'OUT_OF_STOCK',
    inStock = 'IN_STOCK'
}

enum AvailabilityChannels {
    holdForPickup = 'HOLD',
    shipToGuest = 'SHIPGUEST',
    shipToStore = 'SHIPSTORE',
    deliverWithShipt = 'SCHEDULED_DELIVERY'
}

export default class TargetRetriever extends StockRetriever {
    private static readonly STATE_DATA_CLEAN_REGEX = /^window\.__PRELOADED_STATE__\s*=\s*/;

    public supportsStockType(stockType: StockType) {
        return stockType === StockType.online || stockType === StockType.physical;
    }

    private async parseStoreResult(result: any): Promise<boolean> {
        if (!this.zipCode) {
            throw new Error('Zipcode not provided');
        }

        if (!result.hasOwnProperty('products') || !Array.isArray(result.products)) {
            throw new Error('Product list missing in location search');
        }

        const [product] = result.products;
        if (!product) {
            throw new Error('Could not get product in location search');
        }

        return Array.isArray(product.locations) && product.locations.length;
    }

    protected async parseResult(document: Document): Promise<IStockRetrieverResult> {
        const stateDataContainer = document.getElementsByTagName('script')[1];

        if (!(stateDataContainer instanceof HTMLScriptElement)) {
            return;
        }

        const stateDataText = stateDataContainer.innerText.replace(TargetRetriever.STATE_DATA_CLEAN_REGEX, '');
        const stateData = JSON.parse(stateDataText);

        const stockPromiseData = stateData.product.productDetails.item.available_to_promise_network;

        const availabilityStatus = stockPromiseData.availability_status;
        const isOnline = availabilityStatus === AvailabilityStatus.inStock;

        const serviceConfig = stateData.config.services.target;
        const {apiKey, atpFulfillmentAggregator: apiBaseUrl} = serviceConfig;
        const productId = availabilityStatus.product_id;

        const url = `${apiBaseUrl}/fiats/${productId}?key=${apiKey}&nearby=${this.zipCode}&limit=25&requested_quantity=1&radius=100&include_only_available_stores=true&fulfillment_test_mode=grocery_opu_team_member_test`;

        let isPhysical;
        try {
            isPhysical = await axios.get(url).then(res => this.parseStoreResult(JSON.parse(res.data)));
        } catch (e) {
            throw e;
        }

        return { isOnline, isPhysical };
    }
}