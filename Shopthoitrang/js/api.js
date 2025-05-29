// Lưu/lấy danh sách sản phẩm (ở đây giả lập bằng biến tĩnh, sau này có thể fetch từ server)
export function getDanhSachSanPham() {
    return [
        { id_san_pham: 1, ten_san_pham: 'Áo thun nữ trắng', gia: 199000, hinh_anh: 'images/quan-ao1.jpg' },
        { id_san_pham: 5, ten_san_pham: 'Áo khoác nữ trắng', gia: 219000, hinh_anh: 'images/quan-ao2.jpg' },
        { id_san_pham: 2, ten_san_pham: 'Quần jean xanh trời', gia: 399000, hinh_anh: 'images/quan-dai.jpg' },
        { id_san_pham: 6, ten_san_pham: 'Quần jean đen bóng', gia: 350000, hinh_anh: 'images/quan-den-dai.jpg' },
        { id_san_pham: 3, ten_san_pham: 'Giày thể thao trắng', gia: 499000, hinh_anh: 'images/giay-sneaker.jpg' },
        { id_san_pham: 7, ten_san_pham: 'Giày sneaker đen', gia: 549000, hinh_anh: 'images/giay-den.jpg' },
        { id_san_pham: 4, ten_san_pham: 'Túi đeo chéo nam', gia: 299000, hinh_anh: 'images/tui-deo-bung.jpg' },
        { id_san_pham: 8, ten_san_pham: 'Mũ lưỡi trai basic', gia: 99000, hinh_anh: 'images/mu-den.jpg' }
    ];
}

// Giỏ hàng
export function getGioHang() {
    return JSON.parse(localStorage.getItem('gioHang') || '[]');
}
export function setGioHang(gio) {
    localStorage.setItem('gioHang', JSON.stringify(gio));
}

// Đơn hàng (lịch sử mua)
export function getLichSuDonHang() {
    return JSON.parse(localStorage.getItem('lichSuDonHang') || '[]');
}
export function addDonHang(don) {
    let lichSu = getLichSuDonHang();
    lichSu.unshift(don);
    localStorage.setItem('lichSuDonHang', JSON.stringify(lichSu));
}

// Định dạng giá tiền
export function dinhDangGia(gia) {
    return gia.toLocaleString('vi-VN') + '₫';
}