import React, { useState } from "react";
import "./EpicCreation.css";

export default function CreateEpic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Epic:", { title, description });
    // Add API call here
  };

  return (
    <form className="epic-form" onSubmit={handleSubmit}>
      <h2>Create Epic</h2>
      <input
        type="text"
        placeholder="Epic Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Epic Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Create Epic</button>
    </form>
  );
}
