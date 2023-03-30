import { ICookie } from '../../entities';

export enum SortType {
    NONE = 'NONE',
    PRICE = 'PRICE',
    RATING = 'RATING'
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

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
    sortType: SortType.NONE,
    sortOrder: SortOrder.DESC
};

export interface ICookieRepository {
    get(filter: ICookieFilter): Promise<readonly ICookie[]>;
}
