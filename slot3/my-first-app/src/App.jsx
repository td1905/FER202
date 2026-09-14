import "./App.css";
import About from "./About";

function App() {

  const user1 ={
    name: "ptd",
    email: "ptd@gmail.com"
  }

  const user2={
    name: "ptd1",
    email: "ptd1@gmail.com"
  }
  return (
    <>
      <About user={user1} />
      <About user={user2} />
    </>
  );
}

export default App;
