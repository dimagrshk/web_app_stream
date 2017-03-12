import requests
import hashlib
import socket
import msgpack
from flask import render_template, make_response
from app import app
from flask import Flask, render_template, request, jsonify
import json
import sqlite3

conn = sqlite3.connect('database.db')
print ("Opened database successfully")

#conn.execute('CREATE TABLE user1 (login TEXT, password TEXT, email TEXT)')
#conn.close()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/registration')
def get_reg():
    return  render_template('registration.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/stream')
def get_stream():
    return render_template('streamWindow.html')

@app.route('/enter', methods=['POST'])
def enter():
    login = request.form['login']
    password = request.form['password']
    email = request.form['email']
    with sqlite3.connect('database.db') as con:
        cur = con.cursor()
        cur.execute("INSERT INTO user1 (login, password, email) VALUES (?,?,?)", (login,password,email))
        con.commit()
    return render_template('login.html')
    con.close()

@app.route('/ent', methods=['POST'])
def ent():
    login = request.form=['login']
    password = request.form=['password']
    with sqlite3.connect('database.db') as con:
        cur = con.cursor()
        cur.execute("SELECT login, password from user1")
        rows = cur.fetchone()
        # print(rows)
        # if rows[0] == login and rows[1] == password:
        return render_template('streamWindow.html')
        con.close()


@app.route('/from_grin', methods=['POST'])
def from_grin():
    link = request.form['link']
    time=request.form['time']
    x=request.form['x']
    y=request.form['y']
    print("LINK is ", link)
    r = requests.get(link)
    if r.status_code != 200:
       print(r.status_code)
       return json.dumps({ 'answer': r.status_code })
    ##file_name = h.hexdigest() + '.jpg'

    dictry = {'Image': r.content, 'Time': int(time), 'x': int(x), 'y': int(y)}
    sock = socket.socket()
    sock.connect(('192.168.35.145', 8080))
    dumped_dict = msgpack.packb(dictry)
    sock.sendall(dumped_dict)
    sock.close()
    ##h = hashlib.md5()
    ##h.update(link.encode('utf8'))
    ##with open(, 'wb') as f:
    ##    f.write(r.content)
    return json.dumps({'answer': 'picture has been loaded'})
    




