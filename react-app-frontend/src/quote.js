import React, { useEffect, useState, useRef } from 'react';

function Quote() {
  const [data, setData] = useState([]); 
  const buttonRef = useRef(null);

  const deleteQuote = (index) => {
    const quoteItem = data[index];  // Access the quoteItem based on index
    const quoteText = quoteItem.quote;  // Get the quote text
    let bodyObj = JSON.stringify({"quote": quoteText})
    fetch("http://127.0.0.1:5000/API/deleteQuote",{
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
          postData()
        }
      )
    
  
    // Perform your deletion logic (e.g., updating state or calling API)
    // Optionally, remove the quote from the data array and re-render the component
  };

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
      <td className="quote-cell">"{quoteItem.quote}"</td>
      <td>
        <button
          ref={buttonRef}
          onClick={() => deleteQuote(index)}  // Pass the index to deleteQuote handler
        >
          Delete
        </button>
        <button>Edit</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </>
  );
}

export default Quote;
