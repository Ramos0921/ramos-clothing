import Home from './containers/home-container/home.component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './containers/navigation-container/navigation-bar.component';
import Authenticate from './components/authenticate/authenticate.component';
import Shop from './containers/shop-container/shop.component';
import Checkout from './containers/checkout-container/checkout.component';
import { onAuthStateChangeListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=> {
    const unsubscribe = onAuthStateChangeListener(user => {
        if(user) createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
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
