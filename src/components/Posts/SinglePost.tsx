import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../../app/posts/postsSlice";
const SinglePost = () => {
  const { postId } = useParams();
  const nav = useNavigate();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  if (!post) {
    return (
      <section>
        <p>Post Not Found!</p>
      </section>
    );
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link
          // onClick={() => nav(`post/edit/${post.id}`)}
          to={`/post/edit/${post.id}`}
        >
          Edit Post
        </Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePost;
