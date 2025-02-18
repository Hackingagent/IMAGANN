// App.js
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import AnnotationPlatform from './components/AnnotationPlatform';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectForm from './components/ProjectForm';
import AuthForm from './components/AuthForm';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';


function App() {
  const projectId = localStorage.getItem('projectId');
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
          </>
        } />
        <Route path="/authentication" element={<AuthForm />}/>
        <Route
          path="/annotation-platform/:projectId"
          element={
            <ProtectedRoute>
              <LogoutButton />
              <AnnotationPlatform projectId={projectId}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/project-form"
          element={
            <ProtectedRoute>
              <LogoutButton />
              <ProjectForm />
              
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;