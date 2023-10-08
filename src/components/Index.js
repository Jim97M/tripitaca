import React from "react";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Home from "./home/Home";
import { Routes, Route, Outlet } from "react-router-dom";

const Index = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route
            path="/home"
            element={<Home setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
        </Routes>
      ) : (
        <Routes>
          <Route
            path=""
            element={
              <SignIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          ></Route>
          <Route
            path="/signup"
            element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
        </Routes>
      )}
    </div>
  );
};

export default Index;
