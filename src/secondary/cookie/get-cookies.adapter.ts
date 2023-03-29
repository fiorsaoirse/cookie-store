import { useCallback } from 'react';
import { ICookie } from 'src/domain/entities';
import { ICookieFilter } from '../../domain/ports';
import { getCookiesUseCase } from '../../primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useCookieRepositoryService } from './cookie-repository.adapter';

export function useGetCookies(): (filter: ICookieFilter) => Promise<readonly ICookie[]> {
    const repository = useCookieRepositoryService();
    const notificationService = useNotificationService();

    const callback = useCallback(
        (filter: ICookieFilter) => {
            return getCookiesUseCase(filter, { repository, notificationService });
        },
        [repository, notificationService]
    );

    return callback;
}
