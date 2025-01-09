import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8000/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenProject = (projectId) => {
    localStorage.setItem('projectId', projectId); // Save the projectId to local storage
    navigate(`/annotation-platform/${projectId}`);
  };

  return (
    <div className="project-list">
      {projects.map(project => (
        <div className="project-card" key={project.id}>
          <h2 className="project-name">{project.name}</h2>
          <p className="project-description">{project.description}</p>
          <button className="open-project-button" onClick={() => handleOpenProject(project.id)}>Open Project</button>
          <button className="delete-project-button" onClick={() => handleDeleteProject(project.id)}>Delete Project</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;