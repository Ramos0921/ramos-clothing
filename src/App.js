import CategoriesContainer from './containers/categories-container/categories-container.component';
import { Categories } from './data-types/categories/category-types';

const App = () => {
  
  return (
   <CategoriesContainer categories={Categories}/>
  );
}

export default App;
