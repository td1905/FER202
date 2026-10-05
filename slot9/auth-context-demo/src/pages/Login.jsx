import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = login(form.username, form.password);
    if (isSuccess) {
      navigate("/dashboard");
    } else {
      setError("Tài khoản hoặc mật khẩu không chính xác! (Thử: admin / 123)");
    }
  };

  return (
    <div className="center-container">
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tài khoản</label>
            <input
              type="text"
              name="username"
              placeholder="Nhập admin"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập 123"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary">
            Đăng nhập
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
}