import React from "react";

const PORT = 4000; // server port

const App = () => {
  const [username, usernameSet] = React.useState("");
  const [password, passwordSet] = React.useState("");
  const [user, userSet] = React.useState(null);
  const [message, messageSet] = React.useState("");
  const showMessage = (msg) => {
    messageSet(msg);
    setTimeout(() => {
      messageSet("");
    }, 2000);
  };
  const register = async () => {
    if (!username || !password)
      return showMessage("Enter both username and password");
    const register = await fetch(`http://localhost:${PORT}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());
    console.log({ register });
    if (register.register === "OK") {
      showMessage("User successfully registered");
      usernameSet("");
      passwordSet("");
      return;
    }
    showMessage(`User failed to registered. ${register.reason}`);
  };

  const login = async () => {
    if (!username || !password)
      return showMessage("Enter both username and password");
    const login = await fetch(`http://localhost:${PORT}/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());
    console.log({ login });
    if (login.login === "OK") {
      showMessage("Successful login");
      usernameSet("");
      passwordSet("");
      userSet({ username });
      return;
    }
    showMessage(`User login failed. ${login.reason}`);
  };

  const logout = async () => {
    if (!user) return showMessage("Not presently logged in.");
    const logout = await fetch(`http://localhost:${PORT}/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json());
    console.log({ logout });
    if (logout.logout === "OK") {
      showMessage(`User logged out.`);
      userSet(null);
      return;
    }
    showMessage(`User logout failed.`);
  };

  const userInfo = async () => {
    if (!user)
      return showMessage(
        "Not presently logged so can not get more user information."
      );
    const userInfo = await fetch(`http://localhost:${PORT}/user`, {
      credentials: "include",
    }).then((res) => res.json());
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
      <div
        style={{
          margin: "0.5rem",
          padding: "0.5rem",
          textAlign: "center",
          fontSize: "24px",
          background: "rgb(75,0,130)",
          color: "white",
          borderRadius: "10px",
          boxShadow: "7px 5px 5px rgba(75,0,130, 0.5)",
        }}
      >
        {user ? `Logged in as ${user?.username}` : "Presently No One Logged In"}
      </div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => usernameSet(e.target.value)}
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
