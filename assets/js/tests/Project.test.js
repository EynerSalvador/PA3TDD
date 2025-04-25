describe('Project Model', () => {
  let mockProjects;

  beforeEach(() => {
    mockProjects = [
      { id: 1, title: 'Portafolio', description: 'Mi portafolio profesional' },
      { id: 2, title: 'Blog', description: 'Blog personal' }
    ];
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ projects: mockProjects })
      })
    );
  });

  // Usa it() en lugar de test()
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
