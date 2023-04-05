import { HasMessage } from 'src/primary/shared';
import { ICookie } from '../../domain/entities';
import { ICookieFilter, ICookieRepository } from '../../domain/ports';

const BASE_URL = process.env.REACT_APP_API;
const API_URL = `${BASE_URL}/cookies`;

interface IApiResponse {
    data?: {
        cookies: ICookie[];
    };
    errors?: HasMessage[];
}

const repository: ICookieRepository = {
    get: async (request: ICookieFilter): Promise<readonly ICookie[]> => {
        const body = JSON.stringify({
            query: `query CookieQuery($f: Filter!) {
                cookies(filter: $f) {
                  title,
                  description,
                  toppings {
                    name
                  },
                  price,
                  rating
                }
              }`,
            variables: {
                f: request
            }
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

        return details.data?.cookies ?? [];
    }
};

export function useCookieRepositoryService(): ICookieRepository {
    return repository;
}
