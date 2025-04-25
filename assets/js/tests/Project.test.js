describe('Project Model', () => {
  let mockProjects;

  beforeAll(() => {
    // Configurar fetch mock
    global.fetch = jest.fn();
  });

  beforeEach(() => {
    mockProjects = [
      { id: 1, title: 'Portafolio', description: 'Mi portafolio profesional' },
      { id: 2, title: 'Blog', description: 'Blog personal' }
    ];
    
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ projects: mockProjects })
      })
    );
  });

  it('debería crear una instancia con propiedades correctas', () => {
    const project = new Project(mockProjects[0]);
    expect(project.title).toBe('Portafolio');
    expect(project.description).toBe('Mi portafolio profesional');
  });

  it('all() debería retornar todos los proyectos', async () => {
    const projects = await Project.all();
    expect(projects.length).toBe(2);
    expect(projects[0]).toBeInstanceOf(Project);
  });

  it('find() debería encontrar proyecto por ID', async () => {
    const project = await Project.find(1);
    expect(project.id).toBe(1);
  });
});
