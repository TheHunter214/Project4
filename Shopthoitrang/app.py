from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Trang chủ
@app.route('/')
def home():
    return render_template('index.html')

# API trả về danh sách sản phẩm (dữ liệu mẫu)
@app.route('/api/products')
def get_products():
    products = [
        {"name": "Áo thun", "price": "150,000đ", "image": "https://via.placeholder.com/300x400"},
        {"name": "Quần jeans", "price": "300,000đ", "image": "https://via.placeholder.com/300x400"},
        {"name": "Giày sneaker", "price": "450,000đ", "image": "https://via.placeholder.com/300x400"}
    ]
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)
