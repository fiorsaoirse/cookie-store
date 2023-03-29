import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cookie } from './Cookie';
import { ICookie } from 'src/domain/entities';

const mock: ICookie = {
    id: 1,
    title: 'Testing cookie',
    description: 'Cookie for the data checking',
    price: 100,
    rating: 4.5
};

describe('Renders Cookie component', () => {
    beforeAll(() => {
        global.matchMedia =
            global.matchMedia ||
            function () {
                return {
                    addListener: jest.fn(),
                    removeListener: jest.fn()
                };
            };
    });

    test('with mock values', () => {
        render(<Cookie item={mock} />);

        const title = screen.getByTestId('title');
        const description = screen.getByTestId('description');
        const price = screen.getByTestId('price');
        const rating = screen.getByTestId('rating');

        expect(title).toBeInTheDocument();
        expect(title.textContent?.trim()).toBe(mock.title);

        expect(description).toBeInTheDocument();
        expect(description.textContent?.trim()).toBe(mock.description);

        expect(price).toBeInTheDocument();
        expect(price.textContent?.trim()).toBe(`Price: ${mock.price / 100}`);

        expect(rating).toBeInTheDocument();
        expect(rating.textContent?.trim()).toBe(`Rating: ${mock.rating}`);
    });
});
