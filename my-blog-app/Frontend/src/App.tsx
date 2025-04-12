import { Dashboard } from "./components/dashboard/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouteNotFound } from "./common/errorPage/routeNotFound";
import { Header } from "./common/header/header";
import { NewBlogs } from "./components/writeblogs/newBlogs";
import { LoginPage } from "./components/login-page/loginPage";
import { SignUpPage } from "./components/signup-page/signupPage";
import { Provider } from "react-redux";
import CompleteBlogViewPage from "./common/fullViewPage/completeBlogViewPage";
import ProtectedRoutes from "./utils/protectedRoutes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/app/store";
import { UserProfileOverview } from "./components/profile/userProfileOverview";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Header />
            <div className="w-full h-[calc(100vh-12vh)] mt-[12vh] bg-gray-100">
            <Toaster position="top-center" />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="write" element={<NewBlogs />} />
                  <Route path="profile" element={<UserProfileOverview />} />
                </Route>
                <Route path="/blog/:id" element={<CompleteBlogViewPage />} />
                <Route path="*" element={<RouteNotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
