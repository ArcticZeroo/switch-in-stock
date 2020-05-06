import { Sema } from 'async-sema';
import websiteList from '../common/config/websiteList';
import { IStockResult, IStockRetrieverResult } from '../common/models/IStockResult';
import Duration from '@arcticzeroo/duration';

export default class StockCache {
    private static readonly CACHE_EXPIRE_TIME = new Duration({ minutes: 10 });
    private readonly _stockResults: Map<string, IStockResult>;
    private _lastRetrievedTime: number;
    private _resultsLock: Sema;

    constructor() {
        this._stockResults = new Map();
        this._resultsLock = new Sema(1);
    }

    private get _nextExpireTime() {
        return this._lastRetrievedTime + StockCache.CACHE_EXPIRE_TIME.inMilliseconds;
    }

    private get _isExpired() {
        return Date.now() >= this._nextExpireTime;
    }

    private async _update() {
        for (const website of websiteList) {
            if (website.isDisabled || website.retriever.isClientside) {
                continue;
            }

            let stockResult: IStockResult;
            try {
                const retriever = website.retriever.create();
                const result = await retriever.retrieveStock(website.url);
                stockResult = { isError: false, ...result };
            } catch (e) {
                const errorText = (e instanceof Error) ? e.message : e.toString();
                stockResult = { isError: true, errorText };
            }

            this._stockResults.set(website.name, stockResult);
        }

        this._lastRetrievedTime = Date.now();
    }

    private _getResultsAsObject(): { [key: string]: IStockResult } {
        const result = {};
        for (const [key, value] of this._stockResults.entries()) {
            result[key] = value;
        }
        return result;
    }

    async getResults(): Promise<{ [name: string]: IStockResult }> {
        await this._resultsLock.acquire();

        try {
            if (this._isExpired) {
                await this._update();
            }

            return this._getResultsAsObject();
        } catch (e) {
            throw e;
        } finally {
            this._resultsLock.release();
        }
    }
}