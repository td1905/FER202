import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Đăng nhập lưu object { email, name }
  const login = (email) => setUser({ email, name: email.split('@')[0] });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null, // Derived state
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>');
  }
  return context;
};