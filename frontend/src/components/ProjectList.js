import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div>
      <h3>Project List</h3>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.name} - {project.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
