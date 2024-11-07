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

def addQuotesDB(fname, lname, book, yearPub, quote):
    cursor.execute("use quotesDatabase")
    cursor.execute(f"SELECT authorID FROM Authors WHERE fname='{fname}' AND lname='{lname}'")
    result = cursor.fetchall()
    if(len(result) == 0):
        cursor.execute(f"INSERT INTO Authors VALUES ('{fname}', '{lname}');")
        conn.commit()
        cursor.execute(f"SELECT authorID FROM Authors WHERE fname='{fname}' AND lname='{lname}'")
        result = cursor.fetchall()
    cursor.execute(f"SELECT bookID FROM Books WHERE bookName='{book}'")
    result2 = cursor.fetchall()
    if(len(result2) == 0):
        cursor.execute(f"INSERT INTO Books VALUES ('{result[0]['authorID']}', '{book}', '{yearPub}');")
        conn.commit()
        cursor.execute(f"SELECT bookID FROM Books WHERE bookName='{book}'")
        result2 = cursor.fetchall()
    cursor.execute(f"INSERT INTO quotes VALUES ('{result2[0]['bookID']}', '{quote}');")
    conn.commit()
    cursor.execute(f"SELECT quoteID FROM quotes WHERE quote='{quote}'")
    result3 = cursor.fetchall()
    return len(result3)
# addQuotes("Leo", "Tolstoy", "Anna karenina", "1873", "Rummaging in our souls, we often dig up something that ought to have lain there unnoticed.")
# addQuotes("Albert", "Camus", "The Myth of Sisyphus", "1942", "But this time is ours, and we cannot live hating ourselves.")
# print(allQuotes())
# findBook("The Stranger")