import { useSelector } from 'react-redux';
import CategoryPreview from "../category-preview/category-preview.component";
import { selectCategoriesMap } from '../../store/categories/categories.selector';


const CategoriesPreview = () => {
   const categoriesMap = useSelector(selectCategoriesMap);
  
    return (
        <div className="categories-preview-container">
            {
                Object.keys(categoriesMap).map(title => (
                    <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
                ))
            }
        </div>       
    )
}

export default CategoriesPreview;