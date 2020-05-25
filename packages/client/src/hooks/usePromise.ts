import { useState } from 'react';
import Optional from '../models/Optional';

export enum PromiseState {
    none,
    waiting,
    done
}

export interface IPromiseData<T> {
    state: PromiseState;
    value?: T;
    error?: any;
}

export default function usePromise<T>(promise: Optional<Promise<T>>): Optional<IPromiseData<T>> {
    const [data, setData] = useState<IPromiseData<T>>({ state: promise ? PromiseState.waiting : PromiseState.none });

    if (promise) {
        promise
            .then(value => setData({ value, state: PromiseState.done }))
            .catch(error => setData({ error, state: PromiseState.done }));
    }


    return data;
}