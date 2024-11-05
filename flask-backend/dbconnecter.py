import pymssql
import pandas as pd
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

findBook("The Stranger")