import Layout from "layouts/Layout";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";


import Home from "pages/Home";
import Register from "pages/Register";
import SignIn from "pages/SignIn";



function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        {isLoggedIn && <></>}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
