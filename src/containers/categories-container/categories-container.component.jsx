import './categories-container.styles.scss';
import CategoryItem from '../../components/category-item/category-item.component';

const CategoriesContainer = ({categories}) => {

    return (
        <div className="categories-container">
        {
            categories.map(({id, title, imageUrl}) => (
                <CategoryItem key={id} title={title} imageUrl={imageUrl} />
            ))
        }
        </div>
    )
}

export default CategoriesContainer;