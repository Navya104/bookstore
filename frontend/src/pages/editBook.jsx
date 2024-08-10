import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/books/${id}`).then(response => {
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishedYear(response.data.publishedYear);
      setLoading(false);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    })
  }, [])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishedYear
    };
    setLoading(true);
    axios.put(`http://localhost:3000/books/${id}` , data).then(() => {
      setLoading(false);
      enqueueSnackbar('Book Edited Successfully',{variant : 'success'})
      navigate('/');
    }).catch((error) => {
      console.log(error);
      setLoading(false);
      enqueueSnackbar('Error',{variant : 'error'});
    })
  }

  return (
    <div className='p-4'>
     <BackButton></BackButton>
     <h1 className='text-3xl my-4'>Edit Book</h1>
     {loading? <Spinner></Spinner> : ''}
     <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-400'>Title</label>
        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
      
        <label className='text-xl mr-4 text-gray-400'>Author</label>
        <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
      
        <label className='text-xl mr-4 text-gray-400'>Published Year</label>
        <input type='text' value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'></input>
      </div>

      <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
     </div>
    </div>
  )
}

export default EditBook
