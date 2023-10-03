import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import MyOrder from './screens/MyOrder';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>

    <Router>
      <div>
        <Routes>
          <Route exact path='https://being-foody.vercel.app/' element={<Home />} />
          <Route exact path='https://being-foody.vercel.app/login' element={<Login />} />
          <Route exact path='https://being-foody.vercel.app/createuser' element={<Signup />} />
          <Route exact path='https://being-foody.vercel.app/myorder' element={<MyOrder />} />
        </Routes>
      </div>
    </Router>

    </CartProvider>
  );
}

export default App;
