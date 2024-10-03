import React from 'react';
import EmployeeList from './EmployeeList';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <EmployeeList />
      <ProjectList />
      <ProjectForm />
    </div>
  );
};

export default AdminDashboard;
