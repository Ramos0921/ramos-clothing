import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../product-card/product-card.component';
import './category.styles.scss'
import { selectCategoriesMap } from '../../store/categories/categories.selector';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category,categoriesMap]);

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    products?.map(item => <ProductCard key={item.id} product={item}/>)
                }
            </div>
        </Fragment>
    )
}

export default Category;