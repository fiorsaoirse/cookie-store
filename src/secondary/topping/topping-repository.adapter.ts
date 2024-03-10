import { HasMessage } from 'src/primary/shared';
import { ITopping } from '../../domain/entities';
import { IToppingRepository } from '../../domain/ports';
import { GET_TOPPINGS_QUERY } from './queries';

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
    get: async (): Promise<readonly ITopping[]> => {
        if (cache) {
            return Promise.resolve(cache);
        }

        const body = JSON.stringify({
            query: GET_TOPPINGS_QUERY
        });

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });

        const details = (await response.json()) as IApiResponse;

        if (details.errors) {
            throw details.errors;
        }

        cache = details.data?.toppings ?? [];

        return cache;
    }
};

export function useToppingRepositoryService(): IToppingRepository {
    return repository;
}
