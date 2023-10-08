import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in by verifying the presence of a token.
    const token = localStorage.getItem("token");

    if (token) {
      // Token is present, the user is logged in.
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const userToken = localStorage.getItem("token"); // Get the user's token from local storage
      if (!userToken) {
        throw new Error("User token not found.");
      }

      const response = await axios.delete(
        `http://localhost:3001/api/v1/user/signout/${userToken}` // Pass the token in the URL
      );

      if (response.status === 200) {
        navigate("/"); // Redirect to the login page or another appropriate route
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Logout error:", error); // Handle errors (e.g., display an error message)
    }
  };

  return (
    <div>
      Home
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link variant="body2">
          <Button
            type="reset"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            You are In this App
          </Button>
        </Link>
        <Link
          href={"http://localhost:3020?token=" + localStorage.getItem("token")}
        >
          <Button
            type="reset"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Navigate to The Second App
          </Button>
        </Link>
      </Box>
      {isLoggedIn && (
        <Button
          type="reset"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default Home;
