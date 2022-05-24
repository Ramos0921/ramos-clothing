import './home.styles.scss';
import CategoryItem from '../../components/category-item/category-item.component';
import {Categories} from '../../data-types/categories/category-types'

const Home = () => {

    return (
        <div className="categories-container">
        {
            Categories.map(({id, title, imageUrl}) => (
                <CategoryItem key={id} title={title} imageUrl={imageUrl} />
            ))
        }
        </div>
    );
}

export default Home;