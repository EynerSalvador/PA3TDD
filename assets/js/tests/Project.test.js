describe('Project Model', () => {
  let mockProjects;

  beforeAll(() => {
    // Mock global.fetch para el navegador
    window.fetch = jasmine.createSpy('fetch');
  });

  beforeEach(() => {
    mockProjects = [
      { id: 1, title: 'Portafolio', description: 'Mi portafolio profesional', technologies: ['JS'], url: '#' },
      { id: 2, title: 'Blog', description: 'Blog personal', technologies: ['HTML'], url: '#' }
    ];
    
    fetch.and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ projects: mockProjects })
    }));
  });

  it('debería crear una instancia con propiedades correctas', () => {
    const project = new Project(mockProjects[0]);
    expect(project.id).toBe(1);
    expect(project.title).toBe('Portafolio');
    expect(project.description).toBe('Mi portafolio profesional');
    expect(project.technologies).toEqual(['JS']);
    expect(project.url).toBe('#');
  });

  it('all() debería retornar todos los proyectos', async () => {
    const projects = await Project.all();
    expect(projects.length).toBe(2);
    expect(projects[0]).toBeInstanceOf(Project);
    expect(projects[0].title).toBe('Portafolio');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('db.json'));
  });

  it('find() debería encontrar proyecto por ID', async () => {
    const project = await Project.find(1);
    expect(project.id).toBe(1);
    expect(project.title).toBe('Portafolio');
  });
});
