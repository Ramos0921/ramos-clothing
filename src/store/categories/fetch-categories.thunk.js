import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFail } from "./categories.action";

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        dispatch(fetchCategoriesSuccess(await getCategoriesAndDocuments()));
    } catch (e) {
        dispatch(fetchCategoriesFail(e));
    }
};
