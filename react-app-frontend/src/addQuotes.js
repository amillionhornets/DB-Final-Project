import React, {useState, useEffect} from 'react';

function AddQuotes() {
  const [data, setData] = useState([{}]);
  function addQuote() {
    let book = document.getElementById("bookTitle").value;
    let jsonObj = {
      bookName: book // Use the input value here
    };
    
    let bodyObj = JSON.stringify(jsonObj);
    
    fetch("http://127.0.0.1:5000/API/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Add Content-Type header to specify you're sending JSON
      },
      body: bodyObj
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
      console.log(data)
    })
    .catch(error => {
      console.error("Error:", error); // Catch any errors in the fetch process
    });
  }
  
    return (
      <>
        <div className='bg-purple-300'>
            <div class="text-center mt-5">
                <label>Author First Name: <input type="text" id="authorFname" className="border-2 border-black"></input></label><br></br>
                <label>Author Last Name: <input type="text" id="authorLname" className="border-2 border-black"></input></label><br></br>
                <label>Book Name: <input type="text" id="bookTitle" className="border-2 border-black"></input></label><br></br>
                <button onClick={addQuote}>Submit</button>
                {/* <label>Book Name: <input type="text" id="authorFname" className="border-2 border-black"></input></label><br></br> */}
            </div>
        </div>
      </>
    );
  }
  
  export default AddQuotes;