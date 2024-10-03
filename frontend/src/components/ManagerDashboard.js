import React from 'react';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

const ManagerDashboard = () => {
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <ProjectList />
      <ProjectForm />
    </div>
  );
};

export default ManagerDashboard;
