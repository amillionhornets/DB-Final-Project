import React, { useEffect, useState, useRef } from 'react';

function Quote() {
  const [data, setData] = useState([]);
  const [editingQuoteIndex, setEditingQuoteIndex] = useState(null);
  const [editedQuote, setEditedQuote] = useState("");

  const buttonRef = useRef(null);

  const deleteQuote = (index) => {
    const quoteItem = data[index];
    const quoteText = quoteItem.quote;
    let bodyObj = JSON.stringify({ "quote": quoteText });
    fetch("http://127.0.0.1:5000/API/deleteQuote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyObj
    }).then(
      res => res.json()
    ).then(
      data => {
        postData();
      }
    );
  };

  const updateQuote = (index) => {
    const newQuoteItem = editedQuote;
    const oldQuoteItem = data[index]['quote'];
    let bodyObj = JSON.stringify({ "quote": oldQuoteItem, "newQuote":newQuoteItem });
    console.log(bodyObj)
    fetch("http://127.0.0.1:5000/API/updateQuote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: bodyObj
    }).then(
      res => res.json()
    ).then(
      data => {
        postData();
        setEditingQuoteIndex(null);
      }
    );
  };

  function postData() {
    let bodyObj = JSON.stringify({});
    fetch("http://127.0.0.1:5000/API/getAllQuotes", {
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

  useEffect(() => {
    if (data.length > 0) {
      data = null;
    }
    postData();
  }, []);

  const handleEditChange = (event) => {
    setEditedQuote(event.target.value);
  };

  const handleStartEdit = (index, quoteText) => {
    setEditingQuoteIndex(index);
    setEditedQuote(quoteText);
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <table className='border-white border-2 border-collapse m-1'>
        <thead className='text-lg border-white border-2'>
          <tr className='text-lg border-white border-2'>
            <th className='text-lg border-white border-2'>Book</th>
            <th className='text-lg border-white border-2'>Author</th>
            <th className='text-lg border-white border-2'>Quote</th>
            <th className='text-lg border-white border-2'>Edit</th>
          </tr>
        </thead>
        <tbody className='text-lg border-white border-2'>
          {data.map((quoteItem, index) => (
            <tr key={index} className='text-center text-lg border-white border-2'>
              <td className='text-lg border-white border-2'>{quoteItem.bookName}</td>
              <td className='text-lg border-white border-2'>{quoteItem.fname} {quoteItem.lname}</td>
              <td className="quote-cell className='text-lg border-white border-2'">
                {editingQuoteIndex === index ? (
                  <textarea
                    className='text-lg border-white border-2' 
                    value={editedQuote}
                    onChange={handleEditChange} 
                  />
                ) : (
                  <span >{quoteItem.quote}</span>
                )}
              </td>
              <td className='text-lg border-white border-2'>
                <button
                  className='m-1'
                  ref={buttonRef}
                  onClick={() => deleteQuote(index)}
                >
                  Delete
                </button>
                {editingQuoteIndex === index ? (
                  <button onClick={() => updateQuote(index)}>Save</button> // Update button
                ) : (
                  <button onClick={() => handleStartEdit(index, quoteItem.quote)}>Edit</button> // Edit button
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Quote;
