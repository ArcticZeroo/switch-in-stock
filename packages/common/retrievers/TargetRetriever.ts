import axios from 'axios';
import locationConfig from '../config/locationConfig';
import { IStockRetrieverResult } from '../models/IStockResult';
import StockRetriever from '../models/StockRetriever';

enum AvailabilityStatus {
    outOfStock = 'OUT_OF_STOCK',
    inStock = 'IN_STOCK'
}

export default class TargetRetriever extends StockRetriever {
    private static readonly STATE_DATA_CLEAN_REGEX = /^window\.__PRELOADED_STATE__\s*=\s*/;

    private async parseStoreResult(result: any): Promise<IStockRetrieverResult> {
        if (!result.hasOwnProperty('products') || !Array.isArray(result.products)) {
            throw new Error('Product list missing in location search');
        }

        const [product] = result.products;
        if (!product) {
            throw new Error('Could not get product in location search');
        }

        if (!Array.isArray(product.locations) || !product.locations.length) {
            return {
                isInStock: false,
                extraData: {
                    message: `Out of stock at all stores within 100 miles of ${locationConfig.zipCode}`
                }
            };
        }

        return {
            isInStock: true,
            extraData: {
                message: `In stock in at least one store within 100 miles of ${locationConfig.zipCode}`
            }
        };
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
        if (availabilityStatus === AvailabilityStatus.inStock) {
            return {
                isInStock: true,
                extraData: {

                }
            }
        }

        const serviceConfig = stateData.config.services.target;
        const {apiKey, atpFulfillmentAggregator: apiBaseUrl} = serviceConfig;
        const productId = availabilityStatus.product_id;

        const url = `${apiBaseUrl}/fiats/${productId}?key=${apiKey}&nearby=${locationConfig.zipCode}&limit=25&requested_quantity=1&radius=100&include_only_available_stores=true&fulfillment_test_mode=grocery_opu_team_member_test`;

        return axios.get(url)
            .then(res => this.parseStoreResult(JSON.parse(res.data)));
    }
}