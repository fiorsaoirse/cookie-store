import { useCallback } from 'react';
import { ITopping } from 'src/domain/entities';
import { getToppingsUseCase } from '../../primary';
import { useNotificationService } from '../notification/notification-service.adapter';
import { useToppingRepositoryService } from './topping-repository.adapter';

export function useGetToppings(): () => Promise<readonly ITopping[]> {
    const repository = useToppingRepositoryService();
    const notificationService = useNotificationService();

    const callback = useCallback(() => {
        return getToppingsUseCase({ repository, notificationService });
    }, [repository, notificationService]);

    return callback;
}
