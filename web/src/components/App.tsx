import React from 'react';
import Header from './header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Posts from './Posts';
import Main from './Main';
import store from '../redux/store';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
