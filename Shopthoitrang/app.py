from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Dữ liệu sản phẩm giả lập (có thể sau này thay bằng truy vấn SQL)
products = [
    {
        "id": 1,
        "name": "Áo thun nam trắng",
        "price": "199.000đ",
        "image": "/static/images/ao_quan.jpg"
    },
    {
        "id": 2,
        "name": "Quần jean rách gối",
        "price": "399.000đ",
        "image": "/static/images/quan_ao.jpg"
    },
    {
        "id": 3,
        "name": "Giày sneaker trắng",
        "price": "499.000đ",
        "image": "/static/images/ao_quan.jpg"
    }
]

# Trang chủ
@app.route('/')
def home():
    return render_template('index.html')

# Trang sản phẩm
@app.route('/products')
def product_page():
    return render_template('products.html')

# Trang giới thiệu
@app.route('/about')
def about():
    return render_template('about.html')

# Trang liên hệ
@app.route('/contact')
def contact():
    return render_template('contact.html')

# API trả về danh sách sản phẩm dưới dạng JSON
@app.route('/api/products')
def api_products():
    return jsonify(products)

# Chạy ứng dụng
if __name__ == '__main__':
    app.run(debug=True)

@app.route('/api/products/<int:id>')
def get_product_by_id(id):
    # Dữ liệu mẫu
    products = [
        {"id": 1, "name": "Áo Hoodie", "price": "250000", "quantity": 20, "image": "/static/images/hoodie.jpg"},
        {"id": 2, "name": "Áo sơ mi", "price": "150000", "quantity": 10, "image": "/static/images/shirt.jpg"},
    ]
    product = next((p for p in products if p["id"] == id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Không tìm thấy sản phẩm"}), 404

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

@app.route('/orders')
def orders():
    return render_template('orders.html')