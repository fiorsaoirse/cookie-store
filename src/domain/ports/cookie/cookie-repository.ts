import { ICookie } from '../../entities';

export type SortType = 'none' | 'price' | 'rating';
export type SortOrder = 'desc' | 'asc';
export type PriceRange = {
    from: number | null;
    to: number | null;
};

export interface ICookieFilter {
    term?: string;
    selectedToppings: number[];
    range?: PriceRange;
    sortType: SortType;
    sortOrder: SortOrder;
}

export const DEFAULT_COOKIE_FILTER: ICookieFilter = {
    selectedToppings: [],
    sortType: 'none',
    sortOrder: 'desc'
};

export interface ICookieRepository {
    get(filter: ICookieFilter): Promise<readonly ICookie[]>;
}
