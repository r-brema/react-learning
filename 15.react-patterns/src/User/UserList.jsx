import "./User.css";

// Example of a data array that
// you might receive from an API
const data = [
  { name: "Anom", email: "Anom@gmail.com" },
  { name: "Megha", email: "Megha@gmail.com" },
  { name: "Subham", email: "Subham@gmail.com" },
];
const UserList = () => {
  return (
    <div className="user-list">
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.email}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default UserList;
