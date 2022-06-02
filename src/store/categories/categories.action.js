import { CATEGORIES_ACTION_TYPES } from './categories.types';
export const setCategories = (data) => {
    return { type: CATEGORIES_ACTION_TYPES.SET_CURRENT_CATEGORIES, payload: data}
};

export const fetchCategoriesStart = () => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START };
}

export const fetchCategoriesSuccess = (data) => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, payload: data};
}

export const fetchCategoriesFail = (error) => {
    return { type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, payload: error};
}