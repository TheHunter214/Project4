from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('shop.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ten_san_pham TEXT,
            gia INTEGER,
            hinh_anh TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products').fetchall()
    conn.close()
    return jsonify([dict(row) for row in products])

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO products (ten_san_pham, gia, hinh_anh) VALUES (?, ?, ?)',
                (data['ten_san_pham'], data['gia'], data['hinh_anh']))
    conn.commit()
    product_id = cur.lastrowid
    conn.close()
    return jsonify({'id': product_id}), 201

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    conn = get_db_connection()
    conn.execute('UPDATE products SET ten_san_pham=?, gia=?, hinh_anh=? WHERE id=?',
                 (data['ten_san_pham'], data['gia'], data['hinh_anh'], id))
    conn.commit()
    conn.close()
    return jsonify({'updated': id})

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM products WHERE id=?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'deleted': id})

if __name__ == '__main__':
    app.run(port=3000)