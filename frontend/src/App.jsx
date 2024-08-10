import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CreateBook from './pages/createBook';
import DeleteBook from './pages/deleteBook';
import EditBook from './pages/editBook';
import ShowBooks from './pages/showBooks';

const App = () =>{
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/books/create' element={<CreateBook />}></Route>
      <Route path='/books/delete/:id' element={<DeleteBook />}></Route>
      <Route path='/books/edit/:id' element={<EditBook />}></Route>
      <Route path='/books/details/:id' element={<ShowBooks />}></Route>
    </Routes>
  )
}

export default App;