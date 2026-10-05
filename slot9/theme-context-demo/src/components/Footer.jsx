import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`box ${theme}`}>
      <p>© 2026 FER202 - Slot 9 useContext Demo</p>
    </footer>
  );
}