import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import Category from "../../components/category/category.component";
import { fetchCategoriesStart } from "../../store/categories/categories.action";
import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(fetchCategoriesStart());
      },[dispatch])

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            <Route path=":category" element={<Category />}/>
        </Routes>
    )
}

export default Shop;