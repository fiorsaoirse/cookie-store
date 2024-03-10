import { ChangeEvent, useEffect, useState } from 'react';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Collapse, Form, Input, Space } from 'antd';
import { ITopping } from 'src/domain/entities';
import { ICookieFilter, SortOrder, SortType } from 'src/domain/ports';
import { useWidthWatcher } from 'src/secondary';
import './Filter.scss';

const { Panel } = Collapse;

export interface IFliterProps {
    filter: ICookieFilter;
    toppings: readonly ITopping[];
    handleFilterChange: (filter: ICookieFilter | null) => void;
}

const BREAKPOINT = 620;

export function Filter(props: IFliterProps): JSX.Element {
    const { filter, toppings, handleFilterChange } = props;
    const [form] = Form.useForm();

    const [currentFilter, setCurrentFilter] = useState<ICookieFilter>({
        selectedToppings: [] as string[]
    } as ICookieFilter);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    useEffect(() => {
        setCurrentFilter(filter);
    }, [filter]);

    const width = useWidthWatcher();
    const isMobile = width < BREAKPOINT;

    const buttonsWidth = { width: isMobile ? '100%' : 'auto' };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const {
            target: { value }
        } = event;

        const updated: ICookieFilter = { ...currentFilter, term: value };
        setCurrentFilter(updated);
    };

    const handleCheckboxChange = (id: string): void => {
        let selectedToppings: string[];
        const alreadyInSelected = currentFilter.selectedToppings.indexOf(id) !== -1;

        if (alreadyInSelected) {
            selectedToppings = currentFilter.selectedToppings.filter((x) => x !== id);
        } else {
            selectedToppings = currentFilter.selectedToppings.concat(id);
        }

        setCurrentFilter({ ...currentFilter, selectedToppings });
    };

    const handleQuickFilter = (
        selectedButton: string,
        type: SortType,
        order: SortOrder = SortOrder.DESC
    ): void => {
        const updated: ICookieFilter = {
            ...currentFilter,
            sortType: type,
            sortOrder: order
        };
        setCurrentFilter(updated);
        setSelectedButton(selectedButton);
    };

    const clearFilter = (): void => {
        handleFilterChange(null);
        setSelectedButton(null);
    };

    const Wrapper = (child: JSX.Element): JSX.Element =>
        isMobile ? (
            <Collapse style={{ backgroundColor: '#fff' }}>
                <Panel showArrow={false} header="Filters" key="1">
                    {child}
                </Panel>
            </Collapse>
        ) : (
            child
        );

    const FilterForm = (
        <Form className="filter" form={form} layout="vertical">
            <Form.Item
                label="Search"
                tooltip={{ title: 'Enter someting...', icon: <SearchOutlined /> }}>
                <Input value={currentFilter.term} onChange={handleInputChange} data-testid="term" />
            </Form.Item>

            <Form.Item label="Price range">
                <Space direction="horizontal">
                    <Input value={currentFilter.range?.from} data-testid="range-from"></Input>
                    <Input value={currentFilter.range?.to} data-testid="range-to"></Input>
                </Space>
            </Form.Item>

            <Form.Item label="Quick filter">
                <Space direction={isMobile ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                    <Button
                        data-testid="price-high-low"
                        type={selectedButton === 'price-high-low' ? 'primary' : 'default'}
                        onClick={() => handleQuickFilter('price-high-low', SortType.PRICE)}
                        style={buttonsWidth}>
                        Price: high to low
                    </Button>
                    <Button
                        data-testid="price-low-high"
                        type={selectedButton === 'price-low-high' ? 'primary' : 'default'}
                        onClick={() =>
                            handleQuickFilter('price-low-high', SortType.PRICE, SortOrder.ASC)
                        }
                        style={buttonsWidth}>
                        Price: low to high
                    </Button>
                    <Button
                        data-testid="rating"
                        type={selectedButton === 'rating' ? 'primary' : 'default'}
                        onClick={() => handleQuickFilter('rating', SortType.RATING)}
                        style={buttonsWidth}>
                        Popular first
                    </Button>
                </Space>
            </Form.Item>

            <Form.Item label="Toppings" name="toppingValues">
                <Space className="filter_checkbox_container">
                    {toppings.map((topping) => {
                        const checked = !!currentFilter.selectedToppings.find(
                            (x) => x === topping.id
                        );
                        return (
                            <Checkbox
                                data-testid={`topping-${topping.id}`}
                                key={topping.id}
                                value={topping.id}
                                checked={checked}
                                onClick={() => handleCheckboxChange(topping.id)}>
                                {topping.name}
                            </Checkbox>
                        );
                    })}
                </Space>
            </Form.Item>

            <Form.Item>
                <Space direction={isMobile ? 'vertical' : 'horizontal'} style={{ width: '100%' }}>
                    <Button
                        data-testid="search"
                        tabIndex={1}
                        style={buttonsWidth}
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={() => handleFilterChange(currentFilter)}>
                        Search
                    </Button>
                    <Button
                        data-testid="clear"
                        style={buttonsWidth}
                        icon={<DeleteOutlined />}
                        onClick={() => clearFilter()}>
                        Clear
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );

    return Wrapper(FilterForm);
}
