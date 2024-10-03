import React, { useState } from 'react';
import { applyLeave } from '../services/api';


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
    // await applyLeave({ leaveType, startDate, endDate });
    // setLeaveType('');
    // setStartDate('');
    // setEndDate('');
    //setError(null); // Clear previous errors
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
