import './index.css'
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const [data, setData] = useState([{}])
  const navi = useNavigate(); 
  function search(){
      let book = document.getElementById("search").value;
      if(book != ""){
        let bodyObj = JSON.stringify({"bookName": book});
        fetch("http://127.0.0.1:5000/API/getBookQuotes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: bodyObj
        }).then(
          res => res.json()
        ).then(
          data => {
            setData(data);
          }
        );
      }
    }
    const goToQuotesPage = () => {
      navi('/quote');
    };
    return (
      <>
      <div className='bg-purple-300'>
        <div class="text-center mt-20">
            <h1 class="text-center text-7xl mt-5 text-white drop-shadow-2xl">Quote Finder</h1>
            <button  onClick={goToQuotesPage} className='bg-gray-400 text-white rounded-lg text-xl text-center m-3'>Get Started !</button>
        </div>
        <div>
          <div className='size-72 rounded-full bg-gray-300 absolute bottom-0 -left-14 '></div>
          <div className='size-72 rounded-full bg-gray-200 absolute bottom-0 left-0 '></div>
          <div className='size-72 rounded-full bg-gray-200 absolute bottom-5 left-14 '></div> 
          <div className='size-72 rounded-full bg-gray-200 absolute bottom-0 left-28 '></div> 
          <div className='size-72 rounded-full bg-gray-200 absolute -bottom-14 -left-14 '></div>
          <div className='size-72 rounded-full bg-gray-200 absolute -bottom-14 left-14 '></div>
          <div className='size-72 rounded-full bg-gray-300 absolute -bottom-14 left-48'></div>
          <div className='size-72 rounded-full bg-gray-200 absolute -bottom-14 left-52'></div>

          <div class="flex justify-center items-center h-screen">
          <div class="w-96 h-96 bg-gray-300 rounded-full shadow-xl relative">
            <div class="w-16 h-16 bg-gray-500 rounded-full absolute top-12 left-24"></div>
            <div class="w-14 h-14 bg-gray-400 rounded-full absolute top-24 left-48"></div>
            <div class="w-18 h-18 bg-gray-600 rounded-full absolute top-36 left-32"></div>
            <div class="w-12 h-12 bg-gray-500 rounded-full absolute top-48 left-16"></div>
            <div class="w-16 h-16 bg-gray-700 rounded-full absolute top-48 left-56"></div>
            <div class="w-14 h-14 bg-gray-400 rounded-full absolute top-28 left-60"></div>
            <div class="w-40 h-40 bg-gray-500 rounded-full absolute top-40 left-8"></div>
            <div class="w-20 h-20 bg-gray-600 rounded-full absolute top-60 left-40"></div>
          </div>
        </div>


          <div className='size-72 rounded-full bg-gray-300 absolute bottom-0 -right-14 '></div>
          <div className='size-72 rounded-full bg-gray-200 absolute bottom-0 right-0 '></div>
          <div className='size-72 rounded-full bg-gray-200 absolute bottom-5 right-14 '></div> 
          <div className='size-72 rounded-full bg-gray-200 absolute bottom-0 right-28 '></div> 
          <div className='size-72 rounded-full bg-gray-200 absolute -bottom-14 -right-14 '></div>
          <div className='size-72 rounded-full bg-gray-200 absolute -bottom-14 right-14 '></div>
          <div className='size-72 rounded-full bg-gray-300 absolute -bottom-14 right-48'></div>
          <div className='size-72 rounded-full bg-gray-200 absolute -bottom-14 right-52'></div>
        </div>
        </div>
      </>
    );
  }
  
  export default Home;
  