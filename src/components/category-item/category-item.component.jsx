import { Body, CategoryItemContainer, BackgroundImage } from './category-item.styles.jsx';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({category}) => {
    const {title, imageUrl, route,} = category; 
    const navigate = useNavigate();

    const handleTitleNav = () => {
        navigate(route);
    }

    return (
        <CategoryItemContainer onClick={handleTitleNav}>
            <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </CategoryItemContainer>
    ); 
}

export default CategoryItem;
