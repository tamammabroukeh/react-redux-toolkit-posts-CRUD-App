import { ChangeEvent, useState } from "react";
import { addNewPost, addPost } from "../../app/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../../app/users/usersSlice";
import { IUser } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const AddFormPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addNewPostStatus, setAddNewPotStatus] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const handleAuthor = (e: ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSubmit =
    [title, content, userId].every(Boolean) && addNewPostStatus === "idle";
  const addPostHandler = () => {
    // if (title && content) {
    //   dispatch(addPost(title, content, userId));
    // }
    // setTitle("");
    // setContent("");
    if (canSubmit) {
      try {
        setAddNewPotStatus("pending");
        dispatch(addNewPost({ title, body: content, userId }));

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.log("Failed to add the post", error);
      }
      setAddNewPotStatus("idle");
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
      <select id="PostAuthor" value={userId} onChange={handleAuthor}>
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
      <button disabled={!canSubmit} type="button" onClick={addPostHandler}>
        Save Post
      </button>
    </form>
  );
  return (
    <section>
      <h2>Add Post</h2>
      {Form}
    </section>
  );
};

export default AddFormPost;
