import Home from './containers/home-container/home.component';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './containers/navigation-container/navigation-bar.component';
import SignIn from './components/sign-in/sign-in.component';

const App = () => {
  
  return (
    <Routes>
      <Route path='/' element={ <NavigationBar /> }>
        <Route index element={<Home/>}/>
        <Route path='sign-in' element={<SignIn/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
