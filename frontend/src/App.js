import {Routes, Route } from 'react-router-dom';
import './App.css';
import CommentCard from './components/comment';
import Hello from './components/hello';
import SignIn from './components/signin';
import SignUp from './components/signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Hello/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/comment' element={<CommentCard/>}/>
      </Routes>
    </div>
  );
}

export default App;

