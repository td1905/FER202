import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h2>Trang Admin (Dashboard)</h2>
      <p>Xin chào: <strong>{user?.username}</strong></p>
      <p>Vai trò: <code>{user?.role}</code></p>
      <p>Thời gian đăng nhập: {user?.loggedAt}</p>
      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #eee" }} />
      <button className="danger" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
}