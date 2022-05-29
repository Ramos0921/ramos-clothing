import './home.styles.scss';
import CategoryItem from '../../components/category-item/category-item.component';
import {Categories} from '../../data-types/categories/category-types'

const Home = () => {

    return (
        <div className="categories-container">
        {
            Categories.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))
        }
        </div>
    );
}

export default Home;