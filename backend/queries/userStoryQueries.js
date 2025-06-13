const userStoryQueries = {
    getAllUserStories: "SELECT * FROM clone.user_stories",
    getUserStoryById: "SELECT * FROM clone.user_stories WHERE id = $1",
    createUserStory: `
      INSERT INTO clone.user_stories (name, description)
      VALUES ($1, $2)
      RETURNING *
    `,    
    updateUserStory: `
      UPDATE clone.user_stories
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,
    deleteUserStory: "DELETE FROM clone.user_stories WHERE id = $1",
}

export default userStoryQueries