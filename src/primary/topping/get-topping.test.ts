import { ITopping } from 'src/domain/entities';
import { INotificationService, IToppingRepository } from 'src/domain/ports';
import { getToppingsUseCase } from './get-topping';

describe('Get toppings use case', () => {
    let repository: IToppingRepository;
    let notificationService: INotificationService;

    let mocks: ITopping[];

    beforeAll(() => {
        mocks = [
            { id: 1, name: 'Chocolate' },
            { id: 2, name: 'Strawberry' },
            { id: 3, name: 'Coconut' }
        ];

        repository = {
            get() {
                return Promise.resolve(mocks);
            }
        };

        notificationService = {
            notify(): void {
                return;
            }
        };
    });

    test('should return the array of toppings', async () => {
        const service = jest.spyOn(repository, 'get');
        const data = await getToppingsUseCase({ repository, notificationService });
        expect(service).toHaveBeenCalled();
        expect(data).toBe(mocks);
    });
});
