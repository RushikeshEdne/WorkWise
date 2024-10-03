import React, { useEffect, useState } from 'react';
import { getAllEmployees } from '../services/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getAllEmployees();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>{employee.name} - {employee.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
