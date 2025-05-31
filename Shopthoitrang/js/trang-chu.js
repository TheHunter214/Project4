// Dữ liệu mẫu danh mục (sau này lấy từ API)
const dsDanhMuc = [
    { id_danh_muc: 0, ten_danh_muc: "Tất cả" },
    { id_danh_muc: 1, ten_danh_muc: "Áo thun" },
    { id_danh_muc: 2, ten_danh_muc: "Quần jean" },
    { id_danh_muc: 3, ten_danh_muc: "Giày sneaker" },
    { id_danh_muc: 4, ten_danh_muc: "Phụ kiện" }
];

const dsSanPham = [
    // Áo thun
    {
        id_san_pham: 1,
        ten_san_pham: 'Áo thun nữ trắng',
        gia: 199000,
        hinh_anh: 'images/quan-ao1.jpg',
        id_danh_muc: 1
    },
    {
        id_san_pham: 5,
        ten_san_pham: 'Áo khoác nữ trắng',
        gia: 219000,
        hinh_anh: 'images/quan-ao2.jpg',
        id_danh_muc: 1
    },
    // Quần jean
    {
        id_san_pham: 2,
        ten_san_pham: 'Quần jean xanh trời',
        gia: 399000,
        hinh_anh: 'images/quan-dai.jpg',
        id_danh_muc: 2
    },
    {
        id_san_pham: 6,
        ten_san_pham: 'Quần jean đen bóng',
        gia: 350000,
        hinh_anh: 'images/quan-den-dai.jpg',
        id_danh_muc: 2
    },
    // Giày sneaker
    {
        id_san_pham: 3,
        ten_san_pham: 'Giày thể thao trắng',
        gia: 499000,
        hinh_anh: 'images/giay-sneaker.jpg',
        id_danh_muc: 3
    },
    {
        id_san_pham: 7,
        ten_san_pham: 'Giày sneaker đen',
        gia: 549000,
        hinh_anh: 'images/giay-den.jpg',
        id_danh_muc: 3
    },
    // Phụ kiện
    {
        id_san_pham: 4,
        ten_san_pham: 'Túi đeo chéo nam',
        gia: 299000,
        hinh_anh: 'images/tui-deo-bung.jpg',
        id_danh_muc: 4
    },
    {
        id_san_pham: 8,
        ten_san_pham: 'Mũ lưỡi trai basic',
        gia: 99000,
        hinh_anh: 'images/mu-den.jpg',
        id_danh_muc: 4
    }
];

let danhMucDangChon = 0;

function dinhDangGia(gia) {
    return gia.toLocaleString('vi-VN') + '₫';
}

function hienThiDanhMuc() {
    const container = document.getElementById('danh-muc');
    container.innerHTML = '';
    dsDanhMuc.forEach(dm => {
        const btn = document.createElement('button');
        btn.className = 'button-danh-muc';
        if (danhMucDangChon === dm.id_danh_muc) btn.classList.add('selected');
        btn.innerText = dm.ten_danh_muc;
        btn.onclick = () => {
            danhMucDangChon = dm.id_danh_muc; 
            hienThiDanhMuc();
            hienThiSanPham(dsSanPham);
        };
        container.appendChild(btn);
    });
}

function hienThiSanPham(ds) {
    const container = document.getElementById('danh-sach-san-pham');
    container.innerHTML = '';
    let dsLoc = ds;
    if (danhMucDangChon !== 0) {
        dsLoc = ds.filter(sp => sp.id_danh_muc === danhMucDangChon);
    }
    if (dsLoc.length === 0) {
        container.innerHTML = `<div style="padding:32px;text-align:center;color:#d76d77;font-weight:bold;">Không có sản phẩm nào!</div>`;
        return;
    }
    dsLoc.forEach(sp => {
        const div = document.createElement('div');
        div.className = 'card-san-pham';
        div.innerHTML = `
            <img src="${sp.hinh_anh}" alt="${sp.ten_san_pham}">
            <h3>${sp.ten_san_pham}</h3>
            <div class="gia">${dinhDangGia(sp.gia)}</div>
            <button onclick="themVaoGio(${sp.id_san_pham})">Thêm vào giỏ</button>
            <a href="chi-tiet-san-pham.html?id=${sp.id_san_pham}">Xem chi tiết</a>
        `;
        container.appendChild(div);
    });
}

function themVaoGio(idSanPham) {
    // Bạn có thể thêm hiệu ứng chuyển động ở đây nếu muốn
    alert('Đã thêm sản phẩm mã ' + idSanPham + ' vào giỏ (demo)');
}
function themVaoGio(idSanPham) {
    // Lấy giỏ hàng từ localStorage (nếu chưa có thì là mảng rỗng)
    let gio = JSON.parse(localStorage.getItem('gioHang') || '[]');
    let daCo = gio.find(item => item.id_san_pham === idSanPham);
    if (daCo) {
        daCo.so_luong += 1;
    } else {
        gio.push({ id_san_pham: idSanPham, so_luong: 1 });
    }
    localStorage.setItem('gioHang', JSON.stringify(gio));
    showToast('Đã thêm sản phẩm vào giỏ!');
}
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.display = 'block';
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.transition = 'opacity 0.4s';
        toast.style.opacity = '0';
    }, 1400);
    setTimeout(() => {
        toast.style.display = 'none';
        toast.style.transition = '';
    }, 1900);
}
function themVaoGio(idSanPham) {
    let gio = JSON.parse(localStorage.getItem('gioHang') || '[]');
    let daCo = gio.find(item => item.id_san_pham === idSanPham);
    if (daCo) {
        daCo.so_luong += 1;
    } else {
        gio.push({ id_san_pham: idSanPham, so_luong: 1 });
    }
    localStorage.setItem('gioHang', JSON.stringify(gio));
    showToast('Đã thêm sản phẩm vào giỏ!');
}
window.onload = function() {
    hienThiDanhMuc();
    hienThiSanPham(dsSanPham);
};


