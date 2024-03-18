import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../app/users/usersSlice";
import { IUser } from "../../interfaces/interfaces";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../../app/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
const EditFormPost = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleAuthor = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(Number(e.target.value));
  if (!post) {
    return (
      <section>
        <p>Post Not Found!</p>
      </section>
    );
  }

  const canSubmit =
    [title, content, userId].every(Boolean) && requestStatus === "idle";
  const deletePostHandler = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete the post", error);
    } finally {
      setRequestStatus("idle");
    }
  };
  const editPostHandler = () => {
    if (canSubmit) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        );

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${post.id}`);
      } catch (error) {
        console.log("Failed to add the post", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };
  const usersOptions = users.map((user: IUser) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const Form = (
    <form>
      <label htmlFor="PostTitle">Title:</label>
      <input
        type="text"
        id="PostTitle"
        name="PostTitle"
        value={title}
        onChange={handleTitle}
      />
      <label htmlFor="PostAuthor">Author:</label>
      <select id="PostAuthor" defaultValue={userId} onChange={handleAuthor}>
        <option value=""></option>
        {usersOptions}
      </select>
      <label htmlFor="PostContent">Content:</label>
      <textarea
        id="PostContent"
        value={content}
        name="postContent"
        onChange={handleContent}
      />
      <button disabled={!canSubmit} type="button" onClick={editPostHandler}>
        Save Post
      </button>
      <button type="button" onClick={deletePostHandler}>
        delete Post
      </button>
    </form>
  );
  return (
    <section>
      <h2>Edit Post</h2>
      {Form}
    </section>
  );
};

export default EditFormPost;
