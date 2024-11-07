from flask import Flask, jsonify, request, render_template
from flask_restful import Api, Resource, abort
from dbconnecter import findBook, allQuotes
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    return "SEND A POST REQUEST TO THE CORRECT URL"
@app.route('/API/quotes')
def quotes():
    return render_template("quotes.html")

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