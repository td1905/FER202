# Slot 20 — Next.js + Tailwind CSS + Redux Toolkit

Ứng dụng thực hành Next.js App Router, TypeScript, Tailwind CSS v4 và Redux
Toolkit. Mỗi bài bổ sung một nhóm tính năng vào cùng project:

| Bài | Route / tính năng |
| --- | --- |
| 1 | Counter, Redux store theo request và typed hooks |
| 2 | Layout, điều hướng responsive, dark mode và lưu theme |
| 3 | Todo CRUD, bộ lọc, thống kê và lưu localStorage |
| 4 | Sản phẩm từ DummyJSON, tìm kiếm, sắp xếp và giỏ hàng |
| 5 | Notes CRUD qua Route Handlers và RTK Query |

## Chạy ứng dụng

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

Các lệnh kiểm tra:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Các trang

- `/counter` — bộ đếm với bước nhảy và giá trị cộng tùy ý.
- `/todos` — thêm, sửa, hoàn tất, xóa và lọc công việc.
- `/products` — tìm/sắp xếp sản phẩm; dữ liệu lấy từ DummyJSON.
- `/products/[id]` — chi tiết sản phẩm được tải trong Server Component.
- `/cart` — quản lý số lượng và tổng tiền giỏ hàng.
- `/notes` — giao diện thêm, sửa, xóa ghi chú.
- `/api/notes` — API Notes (`GET`, `POST`).
- `/api/notes/[id]` — API một ghi chú (`GET`, `PUT`, `DELETE`).

Theme, Todo và giỏ hàng được khôi phục từ `localStorage` sau khi trang mount để
tránh lỗi hydration. Dữ liệu Notes được lưu trong `data/notes.json`; đây là kho
file local cho bài tập, không phù hợp triển khai trên nền tảng có filesystem
chỉ đọc hoặc nhiều instance. Khi deploy, thay bằng database phù hợp.
