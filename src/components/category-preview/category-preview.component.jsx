import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';

const CategoryPreview = ({title, products}) => {


    return (
        <div className="category-preview-container">
            <h2>
                <span className="title">
                    {title.toUpperCase()}
                </span>
            </h2>
            <div className="preview">
                {
                    products.map((item, index) => {
                        if(index < 4) return (<ProductCard key={index} product={item} />)
                        return;
                    })
                }
            </div>
        </div>
    )
}

export default CategoryPreview;