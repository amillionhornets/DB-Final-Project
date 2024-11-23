import pymssql
from flask import jsonify

def getDBConnection():
    return pymssql.connect(
        server='DYL',
        user='quoteAdmin',
        password='Password1',
        database='quotesDatabase',
        as_dict=True
    )


def findAllAuthors():
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute("use quotesDatabase")
    cursor.execute("SELECT * FROM Authors")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    print(len(result))

def updateQuotes(newQuote, oldQuote):
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute("use quotesDatabase")
    cursor.execute(f"UPDATE quotes SET quote='{newQuote}' WHERE quote='{oldQuote}'")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    print(len(result))

def findBook(bookName):
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute("use quotesDatabase")
    cursor.execute(f"SELECT * FROM Books WHERE bookName='{bookName}'")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return (result[0]["bookName"])

def allQuotes():
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute("use quotesDatabase")
    cursor.execute("SELECT  fname, lname,bookName, quote FROM quotes LEFT JOIN Books ON quotes.bookID = Books.bookID LEFT JOIN Authors ON Books.authorID = Authors.authorID")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

def addQuotesDB(fname, lname, book, yearPub, quote):
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute("use quotesDatabase")
    cursor.execute(f"SELECT authorID FROM Authors WHERE fname='{fname}' AND lname='{lname}'") # Check to see if the author exists
    result = cursor.fetchall()
    if(len(result) == 0):
        cursor.execute(f"INSERT INTO Authors VALUES ('{fname}', '{lname}');") # if the author doesn't exit create record in db
        conn.commit()
        cursor.execute(f"SELECT authorID FROM Authors WHERE fname='{fname}' AND lname='{lname}'") # Get the new record's id
        result = cursor.fetchall()
    cursor.execute(f"SELECT bookID FROM Books WHERE bookName='{book}'") # Check to see if the book exists
    result2 = cursor.fetchall()
    if(len(result2) == 0):
        cursor.execute(f"INSERT INTO Books VALUES ('{result[0]['authorID']}', '{book}', '{yearPub}');") # if the book doesn't exist create record
        conn.commit()
        cursor.execute(f"SELECT bookID FROM Books WHERE bookName='{book}'") # Get book id of new book
        result2 = cursor.fetchall()
    cursor.execute(f"INSERT INTO quotes VALUES ('{result2[0]['bookID']}', '{quote}');") # insert the quote
    conn.commit()
    cursor.execute(f"SELECT quoteID FROM quotes WHERE quote='{quote}'") # Get the quote id
    result3 = cursor.fetchall()
    cursor.close()
    conn.close()
    return len(result3) 

def deleteRecord(quote):
    conn = getDBConnection()
    cursor = conn.cursor()
    cursor.execute("use quotesDatabase")
    cursor.execute(f"DELETE FROM quotes WHERE quote='{quote}'")
    conn.commit()
    cursor.close()
    conn.close()
    return 1
