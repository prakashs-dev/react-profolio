import React,{useEffect} from 'react';
import { Routes,Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchReqInitiated, fetchReqSuccess, fetchReqFailure } from './redux/Actions/fetchDataAction';
import axios from 'axios';
import NavBar from './components/NavBar';
import Shop from './pages/Shop.js';
import CheckOut from './pages/CheckOut';
import './style.css';

const App = () => {
  const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchReqInitiated())
        async function getItemsData() {
            try{
                const response = axios.get('https://dummyjson.com/products');
                dispatch(fetchReqSuccess((await response).data));
                console.log((await response).data);
            }catch(error){
                dispatch(fetchReqFailure(error.message));
            }
        }
        getItemsData();
    },[dispatch])


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/cart' element={<CheckOut/>}/>
      </Routes>

    </>
  )
}

export default App;
