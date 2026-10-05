import { useTheme } from "../contexts/ThemeContext";

export default function Content() {
  const { theme } = useTheme();

  return (
    <main className={`box ${theme}`}>
      <h3>Nội dung chính</h3>
      <p>
        Giao diện hiện tại đang kích hoạt: <b>{theme.toUpperCase()}</b>
      </p>
      <p>
        Dữ liệu theme được truyền xuyên suốt qua Context mà không cần prop drilling!
      </p>
    </main>
  );
}