const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');
const app = express();

app.use(cors());

app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id); 

    if (projectIndex < 0) {
        return response.status(404).json({ error: 'project not found.' });
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request,response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: 'project does not exists.' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});

app.listen(3333, () => {
    console.log('🚀 Seu banco está ligado!');
});

//