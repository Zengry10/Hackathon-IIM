import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ChatBot from './Screens/Chatbot'
import Accueil from './Screens/Accueil'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            {/* <Route path='/' element={<Navigate to='/client/menu'/>}></Route> */}
            <Route path='/accueil' element={<Accueil/>}>test</Route>
            <Route path='/chatbot' element={<ChatBot/>}>test</Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
