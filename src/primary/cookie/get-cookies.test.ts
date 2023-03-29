import { ICookie } from 'src/domain/entities';
import { ICookieFilter, ICookieRepository, INotificationService } from 'src/domain/ports';
import { getCookiesUseCase } from './get-cookies';

describe('Get cookies use case', () => {
    let repository: ICookieRepository;
    let notificationService: INotificationService;

    let filter: ICookieFilter;
    let mocks: ICookie[];

    beforeAll(() => {
        filter = {} as ICookieFilter;

        mocks = [
            {
                id: 1,
                title: 'Chocolate cookie',
                description: 'Crispy cookie with chocolate!',
                price: 100,
                rating: 5
            },
            { id: 2, title: 'Strawberry cookie', price: 120, rating: 5 },
            { id: 3, title: 'Coconut cookie', price: 80, rating: 4.2 }
        ];

        repository = {
            get(): Promise<readonly ICookie[]> {
                return Promise.resolve(mocks);
            }
        };

        notificationService = {
            notify(): void {
                return;
            }
        };
    });

    test('should return the array of cookies', async () => {
        const service = jest.spyOn(repository, 'get');
        const data = await getCookiesUseCase(filter, { repository, notificationService });
        expect(service).toHaveBeenCalled();
        expect(data).toBe(mocks);
    });
});
