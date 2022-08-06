import {Routes, Route } from 'react-router-dom';
import './App.css';
import BookCardMedium from './components/book_card_mid';
import Hello from './components/hello';
import NavigationBar from './components/navbar';
import SignIn from './components/signin';
import SignUp from './components/signup';
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
        <Route path='/comments' element={<ReviewPage/>}/>
        <Route path='/profile' element={<UserProfilePage/>}/>
        <Route path='/book' element={<BookCardMedium/>}/>
      </Routes>
    </div>
  );
}

export default App;

