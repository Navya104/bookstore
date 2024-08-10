import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () =>{
    setLoading(true);
    axios.delete(`http://localhost:3000/books/${id}`).then(response => {
      navigate('/');
      setLoading(false);
      enqueueSnackbar('Book Deleted Successfully',{variant : 'success'})
    }).catch(error =>{
      console.log(error);
      setLoading(false);
      enqueueSnackbar('Error',{variant : 'error'});
    })

  }

  return (
    <div>
      <BackButton></BackButton>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner></Spinner> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure, you want to delete this Book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook
