import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteNotFound } from "./common/routeNotFound";
import { Header } from "./common/header";
import { MyBlog } from "./component/myblogs/myBlogs";
import { WriteBlogs } from "./component/writeblogs/writeBlogs";
import { MyProfile } from "./component/profile/myProfile";
import { LoginPage } from "./component/login-page/loginPage";
import { SignUpPage } from "./component/signup-page/signupPage";
import store from "./app/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="my-blogs" element={<MyBlog />} />
          <Route path="write" element={<WriteBlogs />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
