import { selectAllUsers } from "../../app/users/usersSlice";
import { useSelector } from "react-redux";
import { IPost, IUser } from "../../interfaces/interfaces";

const PostAuthor = ({ userId }: IPost) => {
  const users = useSelector(selectAllUsers);

  const author = users.find((user: IUser) => user.id === userId);

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
