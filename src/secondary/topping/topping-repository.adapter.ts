import { HasMessage } from 'src/primary/shared';
import { ITopping } from '../../domain/entities';
import { IToppingRepository } from '../../domain/ports';

let cache: readonly ITopping[] | null = null;

const BASE_URL = process.env.REACT_APP_API;
const API_URL = `${BASE_URL}/toppings`;

interface IApiResponse {
    data?: {
        toppings: ITopping[];
    };
    errors?: HasMessage[];
}

const repository: IToppingRepository = {
    get: (): Promise<readonly ITopping[]> => {
        if (cache) {
            return Promise.resolve(cache);
        }

        const body = JSON.stringify({
            query: `{
                toppings {
                    id
                    name
                }
            }`
        });

        return fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
            .then(res => res.json() as IApiResponse)
            .then((res: IApiResponse) => {
                if (res.errors) {
                    throw res.errors;
                }

                cache = res.data?.toppings ?? [];
                return cache;
            });
    }
};

export function useToppingRepositoryService(): IToppingRepository {
    return repository;
}
