import { ICookie } from '../../domain/entities';
import {
    DEFAULT_COOKIE_FILTER,
    ICookieFilter,
    ICookieRepository,
    INotificationService
} from '../../domain/ports';
import { DEFAULT_ERROR, hasMessage } from '../shared';

type Deps = {
    repository: ICookieRepository;
    notificationService: INotificationService;
};

export async function getCookiesUseCase(
    filter: ICookieFilter,
    deps: Deps
): Promise<readonly ICookie[]> {
    const { repository, notificationService } = deps;
    const mergedFilter = { ...DEFAULT_COOKIE_FILTER, ...filter };

    try {
        return await repository.get(mergedFilter);
    } catch (e) {
        const message = hasMessage(e) ? e.message : DEFAULT_ERROR;
        notificationService.notify(message, 'error');
        return [];
    }
}
