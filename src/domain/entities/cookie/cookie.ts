import { IIdentifiable, ITopping } from '..';

export type ProductsCents = number;

export interface ICookie extends IIdentifiable {
    title: string;
    description?: string;
    toppings?: readonly ITopping[];
    price: ProductsCents;
    rating: number | null;
}
