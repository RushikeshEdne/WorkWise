import React, { useState } from 'react';
import { applyLeave } from '../services/api';
import jwtDecode from 'jwt-decode';

const LeaveForm = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error,setError] = useState(' ');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    console.log('Token:', token); // Check if the token exists

    // Check if token exists and if it's expired
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        setError('Your session has expired. Please log in again.');
        return;
      }
    } else {
      setError('No token found. Please log in.');
      return;
    }
    
    try {
      await applyLeave({ leaveType, startDate, endDate });
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setSuccess('Leave applied successfully!');
    } catch (error) {
      console.error('Failed to apply leave:',error.message);
      setError('Failed to apply for leave. Please try again.');
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Apply for Leave</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <input
        type="text"
        placeholder="Leave Type"
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit">Apply</button>
    </form>
  );
};

export default LeaveForm;
