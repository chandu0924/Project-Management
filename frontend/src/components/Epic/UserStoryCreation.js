import React, { useState } from "react";
import "./UserStoryCreation.css";

export default function CreateUserStory() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Story:", { title, details });
  };

  return (
    <form className="userstory-form" onSubmit={handleSubmit}>
      <h2>Create User Story</h2>
      <input
        type="text"
        placeholder="Story Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Story Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      <button type="submit">Create Story</button>
    </form>
  );
}
