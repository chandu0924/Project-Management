const userQueries = {
    createUser: `
      INSERT INTO clone.users (email, password)
      VALUES ($1, $2)
    `,
  
    getUserByEmail: `
      SELECT * FROM clone.users WHERE email = $1
    `,
  
    getAllUsers: `
      SELECT id,email,role FROM clone.users;
    `,
  
    getUserById: `
      SELECT * FROM clone.users WHERE id = $1
    `,
  
    updateUser: `
      UPDATE clone.users SET name = $1, email = $2 WHERE id = $3
    `,
  
    deleteUser: `
      DELETE FROM clone.users WHERE id = $1
    `,
  };
  
export default userQueries;