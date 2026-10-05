// src/contexts/ThemeContext.jsx
import { createContext, useContext, useState, useMemo, useCallback } from "react";

// 1. Khởi tạo Context với giá trị mặc định là null để dễ debug khi quên Provider
const ThemeContext = createContext(null);

// 2. Component Provider quản lý state và hàm cập nhật
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Tối ưu tham chiếu value bằng useMemo tránh re-render thừa
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// 3. Custom Hook đóng gói useContext và validation
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme phải được sử dụng bên trong <ThemeProvider>");
  }
  return context;
}