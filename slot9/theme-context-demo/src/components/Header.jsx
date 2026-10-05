import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`box ${theme}`}>
      <h2>FER202 Context Demo</h2>
      <button onClick={toggleTheme}>
        {theme === "light" ? "🌙 Chuyển sang Dark" : "☀️ Chuyển sang Light"}
      </button>
    </header>
  );
}