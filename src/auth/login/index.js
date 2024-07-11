import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignOut,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import {
  Grid,
  Alert,
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
const Login = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const userCredential = await doSignInWithEmailAndPassword(
          email,
          password
        );
        setCurrentUser(userCredential.user);
        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const userCredential = await doSignInWithGoogle();
        setCurrentUser(userCredential.user);
        navigate("/");
      } catch (err) {
        setErrorMessage(err.message);
        setIsSigningIn(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to log out.");
    }
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#0d2d8a" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "cursive" }}
          >
            Weather Dashboard
          </Typography>
          {currentUser ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                edge="end"
              >
                <AccountCircle />
              </IconButton>
              <Typography
                variant="body1"
                component="div"
                sx={{ display: "inline", marginLeft: 1 }}
              >
                {currentUser.email}
              </Typography>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 5 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome Back
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSigningIn}
              sx={{ marginTop: 2 }}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </Button>
            <Typography align="center" sx={{ marginTop: 2 }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Sign up
              </Link>
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mt={2}
            >
              <div
                style={{ borderBottom: "1px solid #ccc", width: "40%" }}
              ></div>
              <Typography variant="body1" style={{ margin: "0 10px" }}>
                OR
              </Typography>
              <div
                style={{ borderBottom: "1px solid #ccc", width: "40%" }}
              ></div>
            </Box>
            <Button
              onClick={onGoogleSignIn}
              fullWidth
              variant="outlined"
              sx={{ marginTop: 2 }}
              disabled={isSigningIn}
            >
              {isSigningIn ? "Signing In..." : "Sign In with Google"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
