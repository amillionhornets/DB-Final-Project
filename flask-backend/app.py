from flask import Flask, jsonify, request, render_template
from flask_restful import Api, Resource, abort
from dbconnecter import findBook, allQuotes, addQuotesDB, deleteRecord, updateQuotes
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    return "SEND A POST REQUEST TO THE CORRECT URL"

@app.route('/API/addQuotes', methods=['POST'])
def addQuotes():
    req = request.get_json(force=True)
    fname = req['firstName']
    lname = req['lastName']
    book = req['bookName']
    year = req['yearPublished']
    quote = req['quote']
    return jsonify(addQuotesDB(fname, lname, book, year, quote))
    # return "test"

@app.route('/API/search', methods=['POST'])
def searchBook():
    req = request.get_json(force=True)
    book = req['bookName']
    return jsonify({"bookName": findBook(book)})

@app.route('/API/getBookQuotes', methods=['POST'])
def search():
    req = request.get_json(force=True)
    book = req['bookName']
    return jsonify({"bookName": findBook(book)})

@app.route('/API/deleteQuote', methods=['POST'])
def delete():
    req = request.get_json(force=True)
    quote = req['quote']
    return jsonify(deleteRecord(quote))

@app.route('/API/updateQuote', methods=['POST'])
def update():
    req = request.get_json(force=True)
    quote = req['quote']
    newQuote = req['newQuote']
    print(quote)
    return jsonify(updateQuotes(newQuote, quote))

@app.route('/API/getAllQuotes', methods=['POST'])
def getQuotes():
    req = request.get_json(force=True)
    return jsonify(allQuotes())

if __name__ == "__main__":
    app.run(debug=True) 