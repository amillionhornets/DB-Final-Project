import React, { useEffect, useState, useRef } from 'react';

function Quote() {
  const [data, setData] = useState([]); 
  const buttonRef = useRef(null);

  const deleteQuote = (index) => {
    const quoteItem = data[index];
    const quoteText = quoteItem.quote;
    let bodyObj = JSON.stringify({"quote": quoteText})
    fetch("http://127.0.0.1:5000/API/deleteQuote",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
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
  };
  const updateQuote = (index) => {
    const quoteItem = data[index];
    const orginalQuote = data[index]['quote']
    console.log(quoteItem.quote);
    // const quoteText = quoteItem.quote;
    // let bodyObj = JSON.stringify({"quote": quoteText})
    // fetch("http://127.0.0.1:5000/API/updateQuote",{
    //   method:"POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: bodyObj
    // }
    // ).then(
    //   res => res.json()
    //   ).then(
    //     data => {
    //       postData()
    //     }
    //   )
  };

  function postData() {
    let jsonObj = {};
    
    let bodyObj = JSON.stringify({ });
    
    fetch("http://127.0.0.1:5000/API/getAllQuotes",{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
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
            <th>Edit</th>
          </tr>
        </thead>
<tbody className='text-lg'>
  {data.map((quoteItem, index) => (
    <tr key={index} className='text-center p-0'>
      <td>{quoteItem.bookName}</td>
      <td>{quoteItem.fname} {quoteItem.lname}</td>              
      <td className="quote-cell">
        <input value={quoteItem.quote} className='w-max' />
      </td>
      <td>
        <button className='m-1'
          ref={buttonRef}
          onClick={() => deleteQuote(index)} 
        >
          Delete
        </button>
        <button onClick={() => updateQuote(index)}
        >Edit</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </>
  );
}

export default Quote;
