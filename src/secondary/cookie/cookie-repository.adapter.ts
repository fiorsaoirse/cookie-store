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
    get: (request: ICookieFilter): Promise<readonly ICookie[]> => {
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
            },
        });

        return fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
            .then(res => res.json() as IApiResponse)
            .then(res => {
                if (res.errors) {
                    throw res.errors;
                }

                return res.data?.cookies ?? [];
            });
    }
};

export function useCookieRepositoryService(): ICookieRepository {
    return repository;
}
