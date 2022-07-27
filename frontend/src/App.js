import {Routes, Route } from 'react-router-dom';
import './App.css';
import Hello from './components/hello';
import SignIn from './components/signin';
import SignUp from './components/signup';
import ReviewPage from './pages/reviewPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Hello/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/comments' element={<ReviewPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

