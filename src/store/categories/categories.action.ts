import { CATEGORIES_ACTION_TYPES, Category} from './categories.types';
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer-utils/reducer-utils';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFail  = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFail;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher((data: Category[]): FetchCategoriesSuccess => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, data);
});

export const fetchCategoriesFail = withMatcher((error: Error): FetchCategoriesFail => {
    return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error );
});