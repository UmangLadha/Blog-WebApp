// import reportWebVitals from "./reportWebVitals";
import { Dashboard } from "./component/dashboard/dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import { RouteNotFound } from "./common/errorPage/routeNotFound";
import { Header } from "./common/header/header";
import { NewBlogs } from "./component/writeblogs/newBlogs";
import { MyProfile } from "./component/profile/myProfile";
import { LoginPage } from "./component/login-page/loginPage";
import { SignUpPage } from "./component/signup-page/signupPage";
import { Provider } from "react-redux";
import CompleteBlogViewPage from "./common/fullViewPage/completeBlogViewPage";
import "./App.css";
import store from "./redux/app/store";
import ProtectedRoutes from "./utils/protectedRoutes";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <div className="w-full h-[calc(100vh-12vh)] mt-[12vh]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="write" element={<NewBlogs />} />
                <Route path="profile" element={<MyProfile />} />
              </Route>
              <Route path="/blog/:id" element={<CompleteBlogViewPage />} />
              <Route path="*" element={<RouteNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
