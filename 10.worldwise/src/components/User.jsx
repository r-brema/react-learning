import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  console.log("user");
  const { user, logOut } = useAuthContext();
  const navigate = useNavigate();

  function handleClick(e) {
    logOut();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
