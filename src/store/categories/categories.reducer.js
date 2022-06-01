import { CATEGORIES_ACTION_TYPES, CATEGORIES_INITIAL_STATE } from './categories.types'

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const { type, payload }= action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CURRENT_CATEGORIES:
            return {
                ...state, 
                categories: payload
            };
        default: 
            return state;
    }

};
