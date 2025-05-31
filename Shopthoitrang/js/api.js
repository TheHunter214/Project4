// --- API SẢN PHẨM ---
// Lấy danh sách sản phẩm từ backend
export async function getDanhSachSanPham() {
    const res = await fetch('http://localhost:3000/api/products');
    return await res.json();
}

// Thêm sản phẩm mới
export async function themSanPham(sanPham) {
    await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(sanPham)
    });
}

// Sửa sản phẩm
export async function suaSanPham(id, sanPham) {
    await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(sanPham)
    });
}

// Xoá sản phẩm
export async function xoaSanPham(id) {
    await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE'
    });
}

// --- GIỎ HÀNG (local) ---
export function getGioHang() {
    return JSON.parse(localStorage.getItem('gioHang') || '[]');
}
export function setGioHang(gio) {
    localStorage.setItem('gioHang', JSON.stringify(gio));
}

// --- ĐƠN HÀNG (nên gọi API, nhưng giữ local tạm nếu backend chưa có) ---
export function getLichSuDonHang() {
    return JSON.parse(localStorage.getItem('lichSuDonHang') || '[]');
}
export function addDonHang(don) {
    let lichSu = getLichSuDonHang();
    lichSu.unshift(don);
    localStorage.setItem('lichSuDonHang', JSON.stringify(lichSu));
}

// --- Định dạng giá tiền ---
export function dinhDangGia(gia) {
    return gia.toLocaleString('vi-VN') + '₫';
}