import React, { useState } from 'react';
import { addProject } from '../services/api';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject({ name, description, deadline });
    setName('');
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Project</h3>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
