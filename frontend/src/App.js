import {Routes, Route } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import './App.css';
import Hello from './components/hello';
import NavigationBar from './components/navbar';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import BuyPage from './pages/buyPage';
import HomePage from './pages/homePage';
import ReviewPage from './pages/reviewPage';
import UserProfilePage from './pages/userProfilePage';
import Test from './pages/test';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <NavigationBar/>
        <Routes>
          <Route path='/' element={<Hello/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/book/:isbn' element={<ReviewPage/>}/>
          <Route path='/profile' element={<UserProfilePage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/buy' element={<BuyPage/>}/>
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;

