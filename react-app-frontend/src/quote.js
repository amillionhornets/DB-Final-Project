import React, { useEffect, useState } from 'react';

function Quote() {
  const [data, setData] = useState([]); 
  
  function postData() {
    let jsonObj = {};
    
    let bodyObj = JSON.stringify({ });
    // let bodyObj = JSON.stringify(jsonObj);
    
    fetch("http://127.0.0.1:5000/API/getAllQuotes",{
      method:"POST",
      headers: {
        "Content-Type": "application/json" // Add Content-Type header to specify you're sending JSON
      },
      body: bodyObj
    }
    ).then(
      res => res.json()
      ).then(
        data => {
          setData(data)
        }
      )
  }
  
  
  useEffect(() => {
    if(data.length > 0){
      data = null
    }
    postData(); 
  }, []);  

  if (data.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
  
   <>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quoteItem, index) => (
            <tr key={index}>
              <td>{quoteItem.bookName}</td>
              <td>{quoteItem.fname} {quoteItem.lname}</td>
              <td>"{quoteItem.quote}"</td>
              <button>Delete</button>
              <button>Edit</button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Quote;
