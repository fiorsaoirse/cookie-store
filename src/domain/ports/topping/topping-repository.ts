import { ITopping } from '../../entities';

export interface IToppingRepository {
    get(): Promise<readonly ITopping[]>;
}
