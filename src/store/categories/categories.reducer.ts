import { CATEGORIES_INITIAL_STATE, CategoriesInitialStateType } from './categories.types'
import { fetchCategoriesStart, fetchCategoriesFail, fetchCategoriesSuccess } from './categories.action';
import { AnyAction } from 'redux';

export const categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE, 
    action: AnyAction
): CategoriesInitialStateType  => {
    
    if(fetchCategoriesFail.match(action)) return {
        ...state,
        error: action.payload,
        isLoading: false,
    };

    if(fetchCategoriesStart.match(action)) return {
        ...state,
        isLoading: true
    };
    
    if(fetchCategoriesSuccess.match(action)) return {
        ...state, 
        categories: action?.payload, 
        isLoading: false,
    };

    return state;
};
