const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample data
let projects = [
  { id: 1, name: 'Project 1', description: 'First project' },
  { id: 2, name: 'Project 2', description: 'Second project' }
];

// GET all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// GET project by ID
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  res.json(project);
});

// POST create new project
app.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  
  const newProject = {
    id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
    name,
    description: description || ''
  };
  
  projects.push(newProject);
  res.status(201).json(newProject);
});

// PUT update project
app.put('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  if (req.body.name) project.name = req.body.name;
  if (req.body.description) project.description = req.body.description;
  
  res.json(project);
});

// DELETE project
app.delete('/api/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ message: 'Project not found' });
  }
  
  const deletedProject = projects.splice(index, 1);
  res.json(deletedProject[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
