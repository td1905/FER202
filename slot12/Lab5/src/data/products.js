// src/data/products.js
export const products = [
  {
    id: 1,
    name: 'Tai nghe Bluetooth',
    description: 'Tai nghe không dây âm thanh vòm sống động, chống ồn chủ động, thời lượng pin lên đến 30 giờ.',
    price: 590000,
    discount: 10, // Giảm 10% -> 531.000 đ
    instock: true,
    rating: 4.5,
    reviews: 120,
    category: 'Âm thanh',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Chuột không dây',
    description: 'Chuột quang không dây tiện lợi, cảm biến độ chính xác cao 1600 DPI, kết nối Bluetooth & 2.4GHz.',
    price: 250000,
    discount: 0, // Không giảm giá -> 250.000 đ
    instock: true,
    rating: 4.2,
    reviews: 85,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Bàn phím cơ',
    description: 'Bàn phím cơ gaming RGB switch xanh gõ đầm tay, keycap PBT doubleshot chống mờ cao cấp.',
    price: 1250000,
    discount: 0, // Không giảm giá -> 1.250.000 đ
    instock: false, // Hết hàng
    rating: 4.8,
    reviews: 210,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Màn hình 24 inch',
    description: 'Màn hình IPS Full HD tràn viền 75Hz, màu sắc trung thực 99% sRGB, bảo vệ mắt lọc ánh sáng xanh.',
    price: 3490000,
    discount: 15, // Giảm 15% -> 2.966.500 đ
    instock: true,
    rating: 4.4,
    reviews: 64,
    category: 'Màn hình',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    name: 'Webcam Full HD',
    description: 'Webcam 1080p tích hợp micro lọc tiếng ồn kép, tự động cân bằng sáng, góc rộng 90 độ tiện họp online.',
    price: 780000,
    discount: 0, // Không giảm giá -> 780.000 đ
    instock: true,
    rating: 4.0,
    reviews: 47,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    name: 'Loa mini',
    description: 'Loa Bluetooth di động nhỏ gọn, âm trầm mạnh mẽ Extra Bass, chuẩn chống nước IPX7 mang đi dã ngoại.',
    price: 450000,
    discount: 20, // Giảm 20% -> 360.000 đ
    instock: false, // Hết hàng
    rating: 3.9,
    reviews: 32,
    category: 'Âm thanh',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 7,
    name: 'Ổ cứng SSD 512GB',
    description: 'Ổ cứng thể rắn NVMe M.2 PCIe Gen 3x4 tốc độ đọc ghi lên tới 3500MB/s, bảo hành chính hãng 5 năm.',
    price: 1190000,
    discount: 5, // Giảm 5% -> 1.130.500 đ
    instock: true,
    rating: 4.7,
    reviews: 156,
    category: 'Lưu trữ',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'USB 64GB',
    description: 'USB 3.2 Gen 1 vỏ kim loại nguyên khối chống sốc, truyền tải dữ liệu siêu nhanh và bền bỉ.',
    price: 150000,
    discount: 0, // Không giảm giá -> 150.000 đ
    instock: true,
    rating: 4.1,
    reviews: 93,
    category: 'Lưu trữ',
    image: 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 9,
    name: 'Cáp sạc Type-C 65W',
    description: 'Cáp bọc dù siêu bền hỗ trợ sạc nhanh chuẩn Power Delivery (PD) 65W và truyền dữ liệu tốc độ cao.',
    price: 200000,
    discount: 10, // Giảm 10% -> 180.000 đ
    instock: true,
    rating: 4.6,
    reviews: 110,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 10,
    name: 'Tai nghe Gaming chụp tai',
    description: 'Tai nghe gaming chụp tai âm thanh 7.1 vòm đa chiều, đệm tai êm ái thoáng khí và micro đàm thoại rõ nét.',
    price: 1850000,
    discount: 25, // Giảm 25% -> 1.387.500 đ
    instock: true,
    rating: 4.9,
    reviews: 245,
    category: 'Âm thanh',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80'
  }
];
