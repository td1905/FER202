import { createContext, useContext, useState } from 'react';

// 1. Tạo Context
const ThemeContext = createContext(null);

// 2. Provider giữ state theme và cung cấp hàm toggleTheme
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Custom hook báo lỗi rõ ràng nếu gọi ngoài Provider
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được dùng bên trong <ThemeProvider>');
  }
  return context;
};