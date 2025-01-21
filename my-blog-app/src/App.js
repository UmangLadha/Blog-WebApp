import { Dashboard } from "./component/dashboard/dashboard";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteNotFound } from "./common/errorPage/routeNotFound";
import { Header } from "./common/header/header";
// import { MyBlog } from "./component/myblogs/myBlogs";
import { NewBlogs } from "./component/writeblogs/newBlogs";
import { MyProfile } from "./component/profile/myProfile";
import { LoginPage } from "./component/login-page/loginPage";
import { SignUpPage } from "./component/signup-page/signupPage";
import { Provider } from "react-redux";
import CompleteBlogViewPage from "./common/fullViewPage/completeBlogViewPage";
import "./App.css";
import store from "./redux/app/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="write" element={<NewBlogs />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="/blog:id" element={<CompleteBlogViewPage />} />
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
