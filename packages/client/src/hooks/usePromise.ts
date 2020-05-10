import { useState } from 'react';

export interface IPromiseData<T> {
    value?: T;
    error?: any;
}

export default function usePromise<T>(promise: Promise<T>) {
    const [data, setData] = useState<IPromiseData<T>>();

    promise
        .then(value => setData({ value }))
        .catch(error => setData({ error }));

    return data;
}