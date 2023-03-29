import { ITopping } from '../../domain/entities';
import { IToppingRepository } from '../../domain/ports';

let cache: readonly ITopping[] | null = null;

const BASE_URL = process.env.REACT_APP_API;
const API_URL = `${BASE_URL}/toppings`;

const repository: IToppingRepository = {
    get: (): Promise<readonly ITopping[]> => {
        if (cache) {
            return Promise.resolve(cache);
        }

        return fetch(API_URL)
            .then((response) => response.json())
            .then((data: ITopping[]) => {
                cache = data;
                return data;
            });
    }
};

export function useToppingRepositoryService(): IToppingRepository {
    return repository;
}
