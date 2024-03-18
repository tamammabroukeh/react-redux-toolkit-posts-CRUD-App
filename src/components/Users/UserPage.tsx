import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../../app/users/usersSlice";
import {
  selectAllPosts,
  selectPostsByUserId,
} from "../../app/posts/postsSlice";

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  //   const postsForUser = useSelector((state) => {
  //     const allPosts = selectAllPosts(state);
  //     return allPosts.filter((post) => post.userId === Number(userId));
  //   });
  // using createSelector for memozied slector
  const postsForUser = useSelector((state) =>
    selectPostsByUserId(state, Number(userId))
  );
  const posts = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    );
  });
  console.log(postsForUser);
  return (
    <section>
      <h2>{user.name}</h2>
      <ol>{posts}</ol>
    </section>
  );
};

export default UserPage;
