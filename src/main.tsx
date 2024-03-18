import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { fetchUsers } from "./app/users/usersSlice.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPosts } from "./app/posts/postsSlice.ts";
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
