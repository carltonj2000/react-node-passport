import React from "react";

const PORT = 4000; // server port
const App = () => {
  const [email, emailSet] = React.useState("");
  const [password, passwordSet] = React.useState("");
  const [user, userSet] = React.useState("");
  const [message, messageSet] = React.useState("");
  const showMessage = (msg) => {
    messageSet(msg);
    setTimeout(() => {
      messageSet("");
    }, 3000);
  };
  const register = async () => {
    if (!email || !password)
      return showMessage("Enter both email and password");
    const register = await fetch(`http://localhost:${PORT}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    console.log({ register });
  };
  const login = async () => {
    if (!email || !password)
      return showMessage("Enter both email and password");
    const login = await fetch(`http://localhost:${PORT}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    console.log({ login });
  };
  const logout = async () => {
    if (!user) return showMessage("Not presently logged in.");
    const logout = await fetch(`http://localhost:${PORT}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => res.json());
    console.log({ logout });
  };
  const userInfo = async () => {
    if (!user)
      return showMessage(
        "Not presently logged so can not get more user information."
      );
    const userInfo = await fetch(`http://localhost:${PORT}/user`).then((res) =>
      res.json()
    );
    console.log({ userInfo });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "640px",
        margin: "auto",
      }}
    >
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => emailSet(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => passwordSet(e.target.value)}
        style={{ margin: "0.5rem", padding: "0.5rem" }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={register}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        >
          Register
        </button>
        <button onClick={login} style={{ margin: "0.5rem", padding: "0.5rem" }}>
          Login
        </button>
        <button
          onClick={logout}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        >
          Logout
        </button>
        <button
          onClick={userInfo}
          style={{ margin: "0.5rem", padding: "0.5rem" }}
        >
          User Info
        </button>
      </div>
      {message && (
        <div
          style={{
            background: "red",
            color: "yellow",
            margin: "1rem",
            padding: "1rem",
            textAlign: "center",
            fontSize: "30px",
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default App;
