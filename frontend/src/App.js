import {Routes, Route } from 'react-router-dom';
import './App.css';
import Hello from './components/hello';
import NavigationBar from './components/navbar';
import SignIn from './components/signin';
import SignUp from './components/signup';
import HomePage from './pages/homePage';
import ReviewPage from './pages/reviewPage';
import UserProfilePage from './pages/userProfilePage';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<Hello/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/book/:bookid' element={<ReviewPage/>}/>
        <Route path='/profile' element={<UserProfilePage/>}/>
        <Route path='/home' element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

