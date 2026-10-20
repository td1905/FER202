// src/data/questions.js
export const questions = [
  {
    id: 1,
    question: 'Component nào trong React Router dùng để bọc toàn bộ ứng dụng nhằm kích hoạt định tuyến phía client?',
    options: ['<RouteProvider>', '<BrowserRouter>', '<StaticRouter>', '<NavigationContainer>'],
    correctAnswer: 1,
    explanation: '<BrowserRouter> sử dụng HTML5 History API (pushState, replaceState) để đồng bộ UI với URL.',
  },
  {
    id: 2,
    question: 'Thẻ nào trong React Router được dùng để tạo liên kết điều hướng mà không làm tải lại trang (reload)?',
    options: ['<a>', '<Href>', '<Link>', '<Redirect>'],
    correctAnswer: 2,
    explanation: '<Link> ngăn chặn hành vi mặc định của trình duyệt và cập nhật URL thông qua History API.',
  },
  {
    id: 3,
    question: 'Hook nào trong React Router được dùng để truy xuất các tham số động từ đường dẫn URL (ví dụ: /news/:id)?',
    options: ['useLocation', 'useParams', 'useSearchParams', 'useNavigate'],
    correctAnswer: 1,
    explanation: 'useParams trả về một đối tượng chứa các cặp key/value của URL parameters hiện tại.',
  },
  {
    id: 4,
    question: 'Trong React Router v6+, component nào được dùng để hiển thị component con bên trong một Layout route chung?',
    options: ['<Outlet />', '<Children />', '<Slot />', '<ViewPort />'],
    correctAnswer: 0,
    explanation: '<Outlet /> hoạt động như một placeholder để render các child routes trong nested routing.',
  },
  {
    id: 5,
    question: 'Hook nào được sử dụng để điều hướng người dùng theo logic xử lý mã lệnh (programmatic navigation)?',
    options: ['useHistory', 'useNavigate', 'useRoute', 'useRedirect'],
    correctAnswer: 1,
    explanation: 'useNavigate thay thế cho useHistory từ React Router v6 trở lên để điều hướng linh hoạt trong JavaScript.',
  },
  {
    id: 6,
    question: 'Khi sử dụng React-Bootstrap Form với useReducer, lợi ích chính là gì?',
    options: [
      'Tự động kết nối tới cơ sở dữ liệu MySQL',
      'Quản lý state form phức tạp và logic validation tập trung, dễ dự đoán',
      'Tăng tốc độ tải trang lên gấp 10 lần',
      'Tự động dịch trang web sang nhiều ngôn ngữ'
    ],
    correctAnswer: 1,
    explanation: 'useReducer giúp gom nhóm toàn bộ trạng thái form, hành động cập nhật và kiểm tra tính hợp lệ vào một reducer duy nhất.',
  },
];
