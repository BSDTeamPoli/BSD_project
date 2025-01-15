const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("db.result.json");
const userdb = JSON.parse(fs.readFileSync("db.users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  return userdb.users.findIndex(
    (u) =>
      (u.email === username || u.username === username) &&
      u.password === password
  );
}

// Fix CORS
server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.send();
  }
  next();
});

// Login user
server.post("/user/authenticate", (req, res) => {
  const { username, password } = req.body;
  const index = isAuthenticated({ username, password });
  if (index === -1) {
    const status = 401;
    const message = "Incorrect username or password";
    return res.status(status).json({ status, message });
  }
  const user = userdb.users[index];
  const token = createToken({ username, password });
  return res.json({ id: user.id, username, token });
});

// Register user
server.post("/user/register", (req, res) => {
  // Create a new user object with an ID
  const newUser = { id: userdb.users.length + 1, ...req.body };

  // Add the new user to the database
  userdb.users.push(newUser);

  // Write the updated database to the file
  fs.writeFile("db.users.json", JSON.stringify(userdb), (err) => {
    if (err) {
      // Handle the error properly
      console.error("Error saving user:", err);
      return res.status(500).json({ error: "Failed to save user" });
    }

    // Log success and send a response
    console.log("The user has been saved!");
    return res
      .status(200)
      .json({ username: newUser.username, email: newUser.email });
  });
});

server.get("/user/:id", (req, res) => {
  // Extract the user ID from the request parameters
  const userId = parseInt(req.params.id, 10);

  // Find the user in the database
  const user = userdb.users.find((u) => u.id === userId);

  // If the user is not found, return a 404 error
  if (!user) {
    const status = 404;
    const message = "User  not found";
    return res.status(status).json({ status, message });
  }

  // If the user is found, return the user object
  return res.status(200).json(user);
});

server.put("/user/:id", (req, res) => {
  // Extract the user ID from the request parameters
  const userId = parseInt(req.params.id, 10);

  // Find the user in the database
  const userIndex = userdb.users.findIndex((u) => u.id === userId);

  // If the user is not found, return a 404 error
  if (userIndex === -1) {
    const status = 404;
    const message = "User  not found";
    return res.status(status).json({ status, message });
  }

  // Update the user object
  userdb.users[userIndex] = { ...userdb.users[userIndex], ...req.body };

  // Write the updated database to the file
  fs.writeFile("db.users.json", JSON.stringify(userdb), (err) => {
    if (err) {
      // Handle the error properly
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Failed to update user" });
    }

    // Log success and send a response
    console.log("The user has been updated!");
    return res.status(200).json(userdb.users[userIndex]);
  });
});

server.delete("/user/:id", (req, res) => {
  // Extract the user ID from the request
  const userId = parseInt(req.params.id, 10);

  // Find the user in the database
  const userIndex = userdb.users.findIndex((u) => u.id === userId);

  // If the user is not found, return a 404 error
  if (userIndex === -1) {
    const status = 404;
    const message = "User  not found";
    return res.status(status).json({ status, message });
  }

  // Delete the user from the database
  userdb.users.splice(userIndex, 1);

  // Write the updated database to the file
  fs.writeFile("db.users.json", JSON.stringify(userdb), (err) => {
    if (err) {
      // Handle the error
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Error deleting user" });
    }

    // Return success
    console.log("User deleted!");
    return res.status(200).json({ message: "User deleted" });
  });
});

server.put("/user/:id/change-password", (req, res) => {
  // Extract the user ID from the request
  const userId = parseInt(req.params.id, 10);

  // Find the user in the database
  const userIndex = userdb.users.findIndex((u) => u.id === userId);

  // If the user is not found, return a 404 error
  if (userIndex === -1) {
    const status = 404;
    const message = "User not found";
    return res.status(status).json({ status, message });
  }

  // Extract the old and new passwords from the request
  const { oldPassword, newPassword } = req.body;

  // Check if the old password is correct
  if (userdb.users[userIndex].password !== oldPassword) {
    const status = 401;
    const message = "Old password is incorrect";
    return res.status(status).json({ status, message });
  }

  // Update the user's password
  userdb.users[userIndex].password = newPassword;

  // Write the updated database to the file
  fs.writeFile("db.users.json", JSON.stringify(userdb), (err) => {
    if (err) {
      // Handle the error
      console.error("Error changing password:", err);
      return res.status(500).json({ error: "Error changing password" });
    }

    // Return success
    console.log("Password changed!");
    return res.status(200).json({ message: "Password changed" });
  });
});

// Use json-server router for all other routes
server.use(router);

server.listen(8200, () => {
  console.log("Run Auth API Server");
  console.log();
  console.log("  Resources");
  console.log("  http://localhost:8200/user/authenticate");
  console.log("  http://localhost:8200/user/register");
});
