import {Routes, Route } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import './App.css';
import Hello from './components/hello';
import NavigationBar from './components/navbar';
import SignIn from './components/signin';
import SignUp from './components/signup';
import BuyPage from './pages/buyPage';
import HomePage from './pages/homePage';
import ReviewPage from './pages/reviewPage';
import UserProfilePage from './pages/userProfilePage';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Hello/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/book/:bookid' element={<ReviewPage/>}/>
          <Route path='/profile' element={<UserProfilePage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/buy' element={<BuyPage/>}/>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;

