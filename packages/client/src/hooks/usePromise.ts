import { useState } from 'react';
import Optional from '../models/Optional';

export interface IPromiseData<T> {
    value?: T;
    error?: any;
}

export default function usePromise<T>(promise: Promise<T>): Optional<IPromiseData<T>> {
    const [data, setData] = useState<IPromiseData<T>>();

    promise
        .then(value => setData({ value }))
        .catch(error => setData({ error }));

    return data;
}