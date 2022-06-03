import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './containers/home-container/home.component';
import NavigationBar from './containers/navigation-container/navigation-bar.component';
import Authenticate from './components/authenticate/authenticate.component';
import Shop from './containers/shop-container/shop.component';
import Checkout from './containers/checkout-container/checkout.component';
import { checkUserSession } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(checkUserSession())
  }, [dispatch]);
  
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
