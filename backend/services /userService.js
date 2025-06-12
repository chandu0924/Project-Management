const pool = require("../db");
const userQueries = require("../queries/userQueries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


/*
paylaod
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
*/
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await pool.query(userQueries.getUserByEmail, [email]);

    if (existingUser.rows.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(userQueries.createUser, [name, email, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
paylaod
{
  "email": "john@example.com",
  "password": "secret123"
}
*/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(userQueries.getUserByEmail, [email]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
get all users
*/
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(userQueries.getAllUsers);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
get user by id in params
*/
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(userQueries.getUserById, [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
update user by id in params
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "password": "newpassword123"
}

*/
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    await pool.query(userQueries.updateUser, [name, email, id]);
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
delete user by id in params
/api/users/:id
*/
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(userQueries.deleteUser, [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
