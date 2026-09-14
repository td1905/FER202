function About({user }) {
  return (
    <div>
      <h1>About</h1>
      <p>my name is {user.name}</p>
      <p>my email: {user.email}</p>
    </div>
  );
}

export default About;