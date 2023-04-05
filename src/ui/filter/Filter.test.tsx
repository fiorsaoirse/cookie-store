/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen } from '@testing-library/react';
import { ITopping } from 'src/domain/entities';
import { ICookieFilter, SortOrder, SortType } from 'src/domain/ports';
import { Filter } from './Filter';

const toppingsMock: ITopping[] = [
    { id: '1', name: 'Coconut' },
    { id: '2', name: 'Strawberry' }
];

const filterMock: ICookieFilter = {
    term: 'Term',
    range: {},
    selectedToppings: ['1'],
    sortType: SortType.NONE,
    sortOrder: SortOrder.DESC
};

describe('Renders Filter component', () => {
    let callback: () => void;

    beforeAll(() => {
        global.matchMedia =
            global.matchMedia ||
            function () {
                return {
                    addListener: jest.fn(),
                    removeListener: jest.fn()
                };
            };

        callback = () => {
            return;
        };
    });

    test('with mock values', () => {
        render(
            <Filter filter={filterMock} toppings={toppingsMock} handleFilterChange={callback} />
        );

        const term = screen.getByTestId('term');
        const quickBtnPriceDsc = screen.getByTestId('price-high-low');
        const quickBtnPriceAsc = screen.getByTestId('price-low-high');
        const quickBtnRating = screen.getByTestId('rating');
        const [checkboxCoconut, checkboxStrawberry] = toppingsMock
            .map((t) => `topping-${t.id}`)
            .map((selector) => screen.getByTestId(selector));
        const searchBtn = screen.getByTestId('search');
        const clearBtn = screen.getByTestId('clear');

        expect(term).toBeInTheDocument();
        expect((term as HTMLInputElement).value.trim()).toBe(filterMock.term);

        expect(quickBtnPriceDsc).toBeInTheDocument();
        expect(quickBtnPriceAsc).toBeInTheDocument();
        expect(quickBtnRating).toBeInTheDocument();

        expect(checkboxCoconut).toBeInTheDocument();
        expect(checkboxCoconut as HTMLInputElement).toBeChecked();

        expect(checkboxStrawberry).toBeInTheDocument();
        expect(checkboxStrawberry as HTMLInputElement).not.toBeChecked();

        expect(searchBtn).toBeInTheDocument();
        expect(clearBtn).toBeInTheDocument();
    });
});
