import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuthContext } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { logIn, user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  console.log(user);

  useEffect(
    function () {
      console.log(isAuthenticated);
      if (isAuthenticated === true) {
        console.log("is auth is true, redirect");
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  function handleLogin(e) {
    e.preventDefault();
    if (email && password)
      logIn({ email, password, avatar: "https://i.pravatar.cc/100?u=zz" });
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
