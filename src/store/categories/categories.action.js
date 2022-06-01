import { CATEGORIES_ACTION_TYPES } from './categories.types';
export const setCategories = (data) => {
    return { type: CATEGORIES_ACTION_TYPES.SET_CURRENT_CATEGORIES, payload: data}
};