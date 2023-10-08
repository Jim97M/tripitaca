import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import Navigate from react-router-dom
import Index from "./components/Index";
import jwt from "jsonwebtoken-promisified";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      const secretKey = "yournewsecretkey";

      try {
        jwt
          .verifyAsync(token, secretKey)
          .then((decodedToken) => {
            setIsLoggedIn(true);

            // Redirect to the "/home" route when logged in
            navigate("/home");
          })
          .catch((err) => {
            setIsLoggedIn(false);
            console.error("Token validation failed:", err);
          });
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Token validation error:", error);
      }
    }
  }, [location.search, navigate]); // Include navigate in the dependency array

  // Render the content based on the user's login status
  return (
    <div>
      <Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default App;
