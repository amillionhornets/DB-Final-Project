from flask import Flask, jsonify, request, render_template
from flask_restful import Api, Resource, abort
from dbconnecter import findBook, allQuotes, addQuotesDB
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

@app.route('/API/search', methods=['POST'])
def search():
    req = request.get_json(force=True)
    book = req['bookName']
    return jsonify({"bookName": findBook(book)})

@app.route('/API/getAllQuotes', methods=['POST'])
def getQuotes():
    # req = request.get_json(force=True)
    return jsonify(allQuotes())

if __name__ == "__main__":
    app.run() 