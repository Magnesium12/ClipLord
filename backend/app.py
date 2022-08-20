from flask import Flask, jsonify, json, request
from storage import Storage
import json
app = Flask(__name__)


@app.route('/test')
def hello():
    return "Hello World! server is working"

@app.route('/copy', methods = ["POST"])
def copy():
    h = request.headers
    hed = json.dumps({k:v for k, v in h.items()})
    head = json.loads(hed)
    name = head["Username"]
    #token = head["Authorization"]
    #//h_f = h.decode('utf8').replace("'", '"')
    #hff = json.loads(h_f)
    x = request.data
    y = x.decode('utf8').replace("'", '"')
    z = json.loads(y)
    text = z["text"]
    #token = z["access-token"]
    Storage.export_data(text,name)
    return {"text":text, "name": name}

@app.route('/paste', methods = ["GET"])
def paste():
    h = request.headers
    hed = json.dumps({k:v for k, v in h.items()})
    head = json.loads(hed)
    name = head["Username"]
    data = Storage.import_data(name)
    print("data sent: ",data)
    return data

if __name__ == '__main__':
    app.run()