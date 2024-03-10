import { FloatButton, Layout } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ICookie, ITopping } from '../domain/entities';
import { DEFAULT_COOKIE_FILTER, ICookieFilter } from '../domain/ports';
import { useGetCookies, useGetToppings } from '../secondary';
import './App.scss';
import { Cookie } from './cookie/Cookie';
import { Filter } from './filter/Filter';

const { Header, Content, Footer } = Layout;

function App() {
    const [filter, setFilter] = useState<ICookieFilter>(DEFAULT_COOKIE_FILTER);
    const [cookies, setCookies] = useState<readonly ICookie[]>([]);
    const [toppings, setToppings] = useState<readonly ITopping[]>([]);

    console.log(cookies);
    console.log(toppings);

    const loadCookies = useGetCookies();
    const loadToppings = useGetToppings();

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadCookies(filter);
            setCookies(data);
        };

        fetchData();
    }, [filter, loadCookies]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadToppings();
            setToppings(data);
        };

        fetchData();
    }, [loadToppings]);

    const handleFilterChange = useCallback((f: ICookieFilter | null) => {
        setFilter(f ?? structuredClone(DEFAULT_COOKIE_FILTER));
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header-content">Welcome to our cookie store</Header>

            <Content className="filter-content">
                <div className="filter-content__container">
                    <Filter
                        filter={filter}
                        toppings={toppings}
                        handleFilterChange={handleFilterChange}
                    ></Filter>
                </div>
            </Content>

            <Content className="product-content">
                <div className="product-content__container">
                    {cookies.map((cookie: ICookie) => (
                        <Cookie key={cookie.id} item={cookie}></Cookie>
                    ))}
                </div>
            </Content>

            <FloatButton.BackTop />

            <Footer style={{ textAlign: 'center' }}>Cookie Store ©2023</Footer>
        </Layout>
    );
}

export default App;
