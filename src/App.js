import Home from './containers/home-container/home.component';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './containers/navigation-container/navigation-bar.component';
import Authenticate from './components/authenticate/authenticate.component';
import Shop from './containers/shop-container/shop.component';
import Checkout from './containers/checkout-container/checkout.component';

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={ <NavigationBar /> }>
        <Route index element={<Home/>}/>
        <Route path='auth' element={<Authenticate/>}></Route>
        <Route path='shop/*' element={<Shop/>}></Route>
        <Route path='checkout' element={<Checkout/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
