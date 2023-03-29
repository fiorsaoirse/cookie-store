import { IIdentifiable } from '..';

export type ProductsCents = number;

export interface ICookie extends IIdentifiable {
    title: string;
    description?: string;
    toppings?: readonly number[];
    price: ProductsCents;
    rating: number | null;
}
