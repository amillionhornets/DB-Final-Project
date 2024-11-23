import React, {useState, useEffect} from 'react';

function AddQuotes() {
  const [data, setData] = useState([{}]);
  function addQuote() {
    let fname = document.getElementById("authorFname").value;
    let lname = document.getElementById("authorLname").value;
    let book = document.getElementById("bookTitle").value;
    let year = document.getElementById("year").value;
    let quote = document.getElementById("quote").value;
    let jsonObj = {
      firstName: fname,
      lastName: lname,
      bookName: book, 
      yearPublished: year, 
      quote: quote
    };
    
    let bodyObj = JSON.stringify(jsonObj);
    
    fetch("http://127.0.0.1:5000/API/addQuotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: bodyObj
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
      console.log(data)
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  
    return (
      <>
        <div className='bg-purple-300'>
            <div class="text-center mt-5">
                <label>Author First Name: <input type="text" id="authorFname" className="border-2 border-black"></input></label><br></br>
                <label>Author Last Name: <input type="text" id="authorLname" className="border-2 border-black"></input></label><br></br>
                <label>Book Name: <input type="text" id="bookTitle" className="border-2 border-black"></input></label><br></br>
                <label>year: <input type="text" id="year" className="border-2 border-black"></input></label><br></br>
                <label>Quote: <input type="text" id="quote" className="border-2 border-black"></input></label><br></br>
                <button onClick={addQuote}>Submit</button>
                {/* <label>Book Name: <input type="text" id="authorFname" className="border-2 border-black"></input></label><br></br> */}
            </div>
        </div>
      </>
    );
  }
  
  export default AddQuotes;