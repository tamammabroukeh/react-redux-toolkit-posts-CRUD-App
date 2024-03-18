import { useSelector } from "react-redux";
import { selectAllUsers } from "../../app/users/usersSlice";
import { Link } from "react-router-dom";
const Users = () => {
  const users = useSelector(selectAllUsers);
  console.log(users);
  const renderUsers = users.map((user) => {
    return (
      <li key={user.id}>
        <Link to={`/user/${user.id}`}>{user.name}</Link>
      </li>
    );
  });
  return (
    <section>
      <h2>Users</h2>
      <ol>{renderUsers}</ol>
    </section>
  );
};

export default Users;
