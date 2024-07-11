import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doCreateUserWithEmailAndPassword,
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
const Register = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      await doSignOut();
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to log out.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        setCurrentUser(userCredential.user);
        navigate("/");
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#0d2d8a", fontFamily: "cursive" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ backgroundColor: "" }}
              >
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
            Create an Account
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
              disabled={isRegistering}
              sx={{ marginTop: 2 }}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </Button>
            <Typography align="center" sx={{ marginTop: 2 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
