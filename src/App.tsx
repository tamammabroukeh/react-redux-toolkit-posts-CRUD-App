import Posts from "./components/Posts/Posts";
import AddFormPost from "./components/Posts/AddFormPost";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./components/Posts/SinglePost";
import EditFormPost from "./components/Posts/EditFormPost";
import Users from "./components/Users/Users";
import UserPage from "./components/Users/UserPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Posts />} />
        <Route path="post">
          <Route index element={<AddFormPost />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditFormPost />} />
        </Route>

        <Route path="user">
          <Route index element={<Users />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
