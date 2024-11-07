import pymssql
from flask import jsonify
conn = pymssql.connect(
    server='DYL',
    user='quoteAdmin',
    password='Password1',
    database='master',
    as_dict=True
)

cursor = conn.cursor()

def findAllAuthors():
    cursor.execute("use quotesDatabase")
    cursor.execute("SELECT * FROM Authors")
    result = cursor.fetchall()
    print(len(result))

def findBook(bookName):
    cursor.execute("use quotesDatabase")
    cursor.execute(f"SELECT * FROM Books WHERE bookName='{bookName}'")
    result = cursor.fetchall()
    return (result[0]["bookName"])

def allQuotes():
    cursor.execute("use quotesDatabase")
    cursor.execute("SELECT  fname, lname,bookName, quote FROM quotes LEFT JOIN Books ON quotes.bookID = Books.bookID LEFT JOIN Authors ON Books.authorID = Authors.authorID")
    result = cursor.fetchall()
    return result

print(allQuotes())
# findBook("The Stranger")