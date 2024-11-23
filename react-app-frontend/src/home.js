import './index.css'
import React, {useState, useEffect} from 'react';


function Home() {
  const [data, setData] = useState([{}])
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
    return (
      <>
      <div className='bg-purple-300'>
        <div class="text-center mt-20">
            <h1 class="text-center text-7xl mt-5 text-white drop-shadow-2xl">Quote Finder</h1>
            <div className='mt-5 text-2xl'>
              <label for="searchBar"><input type="text" id="search"></input></label>
              <button class='bg-gray-400 text-white rounded-lg text-md text-center m-3' onClick={() => search()}>Search</button>
            </div>
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
        </div>
        </div>
      </>
    );
  }
  
  export default Home;
  