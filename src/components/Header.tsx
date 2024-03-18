import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCount, increaseCount } from "../app/posts/postsSlice";
const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);
  return (
    <header className="Header">
      <h3>React Blog</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Posts</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
          <li>
            <button onClick={() => dispatch(increaseCount())}>{count}</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
