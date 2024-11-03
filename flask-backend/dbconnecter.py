import pymssql

conn = pymssql.connect(
    server='DYL',
    user='quoteAdmin',
    password='Password1',
    database='master',
    as_dict=True
)

cursor = conn.cursor()

def findAllAuthors():
    result = cursor.fetchall()
    cursor.execute("use quotesDatabase")
    cursor.execute("SELECT * FROM Authors")
    