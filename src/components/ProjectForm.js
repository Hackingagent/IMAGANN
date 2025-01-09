import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProjectList from './ProjectList';

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log("My token", token);
      if (!token) {
        setError('You must be logged in to create a project');
        return;
      }
  
      const response = await axios.post('http://localhost:8000/api/projects', {
        name: projectName,
        description: projectDescription,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Response:', response);
  
      if (response.status === 200) {
        const successMessage = 'Project created successfully!';
        setProjectName('');
        setProjectDescription('');
        setSuccess(successMessage);
        setError(null);
      } else {
        setError(`Error creating project: ${response.status}`);
        setSuccess(null);
      }
    } catch (error) {
      if (error.response) {
        setError(`Error creating project: ${error.response.status}`);
        setSuccess(null);
      } else {
        setError('Error creating project: unknown error');
        setSuccess(null);
      }
    }
  };

  return (
    <div className='project-form'>
      <form onSubmit={handleSubmit}>
        <h2>Create New Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
        />
        <button type="submit">Create Project</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>

      <h2>Existing Projects:</h2>
      <ProjectList />
    </div>
  );
};

export default ProjectForm;