import express from "express";
import pg from "pg";
import cors from "cors"; // Import the cors package
import bcrypt from "bcrypt";
import { formatDistanceToNow } from "date-fns";
import jwt from "jsonwebtoken";

const app = express();

// Enable CORS for all origins (allows any domain to access your API)
app.use(cors());

// PostgreSQL client setup
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "loginWebApp",
  password: "newyork123",
  port: 5432,
});
db.connect();

app.use(express.json());

app.get("/employees", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM employees");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees." });
  }
});

app.get("/getUserInfo", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, role, email, last_seen FROM employees ORDER BY last_seen DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});

app.post("/filter", async (req, res) => {
  const filteredName = req.body.filteredUsers;
  console.log(`name passed to filter: ${filteredName}`);
  try {
    const result = await db.query(
      "SELECT id, name, role, email, last_seen FROM employees WHERE name ILIKE $1 ORDER BY last_seen DESC",
      [`%${filteredName}%`]
    );
    console.log(`filtered users: ${result.rows[0]}`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user data" });
  }
});

// API endpoint to register a user
app.post("/register", async (req, res) => {
  const { email, password, name, role } = req.body;
  const lastSeen = new Date();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Received request:");
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Hashed Password: ${hashedPassword}`);
  console.log(`Name: ${name}`);
  console.log(`Role: ${role}`);
  // After processing, send a response back to the client
  await db.query(
    "INSERT INTO employees (name, role, email, password, last_seen) VALUES ($1, $2, $3, $4, $5)",
    [name, role, email, hashedPassword, lastSeen]
  );
  const result = await db.query("SELECT * FROM employees WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  res.status(200).json({ message: "User registered successfully.", user });
});

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  //   const lastSeen = new Date().toISOString();
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password. " });
  }

  // After processing, send a response back to the client
  try {
    const result = await db.query(
      "SELECT name, role, email, password, blocked FROM employees WHERE email = $1",
      [email]
    );

    console.log(`length of the result: ${result.rows.length}`);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      const blockedStatus = user.blocked;

      if (passwordMatch) {
        if (blockedStatus == false) {
          await db.query(
            "UPDATE employees SET last_seen = CURRENT_TIMESTAMP WHERE email = $1",
            [email]
          );
          //   const token = jwt.sign(
          //     { id: user.id, email: user.email },
          //     "your-secret-key",
          //     { expiresIn: "1h" } //TOKEN EXPIRATION TIME
          //   );
          //   console.log(`generated token: ${token}`);
          res.status(200).json({ message: "Login successful.", user });
        } else {
          res.status(401).json({
            message: "User blocked. Contact your administrator.",
            user,
          });
        }
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error querying database", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/block", async (req, res) => {
  const { ids } = req.body; // Get the array of user IDs from the request

  // Ensure that the "ids" array is not empty
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "No users selected for blocking." });
  }

  try {
    // Update the "blocked" column for the selected IDs
    const query = `
        UPDATE employees
        SET blocked = true
        WHERE id = ANY($1::int[])`;
    const values = [ids];

    await db.query(query, values);

    res.status(200).json({ message: "Users blocked successfully." });
  } catch (error) {
    console.error("Error blocking users:", error);
    res.status(500).json({ message: "Server error while blocking users." });
  }
});

app.post("/checkBlocked", async (req, res) => {
  const activeUser = req.body;
  console.log(
    `activeUser email: ${activeUser.email} blocked status: ${activeUser.blocked}`
  );

  const result = await db.query(
    "SELECT blocked FROM employees WHERE email = $1",
    [activeUser.email]
  );
  const blockedStatus = result.rows[0];
  res.status(200).json(blockedStatus);
});

app.post("/unblock", async (req, res) => {
  const { ids } = req.body; // Get the array of user IDs from the request

  // Ensure that the "ids" array is not empty
  if (!ids || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "No users selected for unblocking." });
  }

  try {
    // Update the "blocked" column for the selected IDs
    const query = `
          UPDATE employees
          SET blocked = false
          WHERE id = ANY($1::int[])`;
    const values = [ids];

    await db.query(query, values);

    res.status(200).json({ message: "Users unblocked successfully." });
  } catch (error) {
    console.error("Error unblocking users:", error);
    res.status(500).json({ message: "Server error while unblocking users." });
  }
});

app.post("/delete", async (req, res) => {
  const { ids } = req.body; // Get the array of user IDs from the request

  // Ensure that the "ids" array is not empty
  if (!ids || ids.length === 0) {
    return res.status(400).json({ message: "No users selected for deleting." });
  }

  try {
    // Update the "blocked" column for the selected IDs
    const query = `
        DELETE FROM employees
        WHERE id = ANY($1::int[])`;
    const values = [ids];

    await db.query(query, values);

    res.status(200).json({ message: "Users deleted successfully." });
  } catch (error) {
    console.error("Error unblocking users:", error);
    res.status(500).json({ message: "Server error while deleting users." });
  }
});
// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
