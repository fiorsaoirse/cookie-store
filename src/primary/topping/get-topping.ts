import { ITopping } from '../../domain/entities';
import { INotificationService, IToppingRepository } from '../../domain/ports';
import { DEFAULT_ERROR, hasMessage } from '../shared';

type Deps = {
    repository: IToppingRepository;
    notificationService: INotificationService;
};

export async function getToppingsUseCase(deps: Deps): Promise<readonly ITopping[]> {
    const { repository, notificationService } = deps;

    try {
        return await repository.get();
    } catch (e) {
        const message = hasMessage(e) ? e.message : DEFAULT_ERROR;
        notificationService.notify(message, 'error');
        return [];
    }
}
