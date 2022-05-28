import { useContext } from "react";
import { CatoriesContext } from "../../contexts/categories-context/categories.context";
import CategoryPreview from "../category-preview/category-preview.component";

const CategoriesPreview = () => {
   const { categoriesMap } = useContext(CatoriesContext);
  
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