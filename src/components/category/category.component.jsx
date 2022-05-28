import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CatoriesContext } from '../../contexts/categories-context/categories.context';
import ProductCard from '../product-card/product-card.component';
import './category.styles.scss'

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CatoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category,categoriesMap]);

    return (
        <div className='category-container'>
            {
                products?.map(item => <ProductCard key={item.id} product={item}/>)
            }
        </div>
    )
}

export default Category;