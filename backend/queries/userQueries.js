module.exports = {
    createUser: `
      INSERT INTO clone.users (name, email, password)
      VALUES ($1, $2, $3)
    `,
  
    getUserByEmail: `
      SELECT * FROM clone.users WHERE email = $1
    `,
  
    getAllUsers: `
      SELECT id, name, email FROM clone.users
    `,
  
    getUserById: `
      SELECT id, name, email FROM clone.users WHERE id = $1
    `,
  
    updateUser: `
      UPDATE clone.users SET name = $1, email = $2 WHERE id = $3
    `,
  
    deleteUser: `
      DELETE FROM clone.users WHERE id = $1
    `,
  };
  