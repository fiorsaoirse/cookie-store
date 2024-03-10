import { Card, Image } from 'antd';
import { ICookie } from '../../domain/entities';
import './Cookie.scss';

export interface ICookieProps {
    item: ICookie;
}

const HEIGHT = '220px';

export function Cookie({ item }: ICookieProps): JSX.Element {
    return (
        <Card className="cookie-card" title={<div data-testid="title">{item.title}</div>} hoverable>
            <div className="cookie-body">
                <div className="cookie-body__image">
                    <Image width="100%" height={HEIGHT} src="/cookie.png" preview={false}></Image>
                </div>
                {item.description && (
                    <div className="cookie-body__info" data-testid="description">
                        <i>{item.description}</i>
                    </div>
                )}
                <div className="cookie-body__footer">
                    <p data-testid="price">
                        Price: <b>{item.price / 100}</b>
                    </p>
                    <p data-testid="rating">
                        Rating: <b>{item.rating ?? 0}</b>
                    </p>
                </div>
            </div>
        </Card>
    );
}
