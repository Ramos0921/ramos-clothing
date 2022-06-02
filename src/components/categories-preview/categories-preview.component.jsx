import { useSelector } from 'react-redux';
import CategoryPreview from "../category-preview/category-preview.component";
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import Spinner from '../spinner/spinner';

const CategoriesPreview = () => {
   const categoriesMap = useSelector(selectCategoriesMap);
   const isLoading = useSelector(selectCategoriesIsLoading);
  
    return (
        <div className="categories-preview-container">
            {
                isLoading ? 
                    (<Spinner/>)
                :
                    (Object.keys(categoriesMap).map(title => (
                        <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
                    )))
            }
        </div>       
    )
}

export default CategoriesPreview;