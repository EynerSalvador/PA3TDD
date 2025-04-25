describe('Project Model', () => {
  let mockProjects;

  beforeAll(() => {
    // Mock de fetch
    window.fetch = jasmine.createSpy('fetch').and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          projects: mockProjects 
        })
      })
    );
  });

  beforeEach(() => {
    mockProjects = [
      {
        id: 1,
        title: 'Portafolio',
        description: 'Mi portafolio profesional',
        technologies: ['JS', 'HTML'],
        url: 'https://portafolio.com'
      },
      {
        id: 2,
        title: 'Blog',
        description: 'Blog personal',
        technologies: ['CSS'],
        url: 'https://blog.com'
      }
    ];
  });

  it('debería crear una instancia con propiedades correctas', () => {
    const project = new Project(mockProjects[0]);
    expect(project.id).toBe(1);
    expect(project.title).toBe('Portafolio');
    expect(project.technologies).toEqual(['JS', 'HTML']);
    expect(project.url).toBe('https://portafolio.com');
    expect(project.createdAt).toBeDefined();
  });

  it('all() debería retornar todos los proyectos', async () => {
    const projects = await Project.all();
    expect(projects.length).toBe(2);
    expect(projects[0]).toBeInstanceOf(Project);
    expect(fetch).toHaveBeenCalledWith('/_data/db.json');
  });

  it('find() debería encontrar proyecto por ID', async () => {
    const project = await Project.find(1);
    expect(project.id).toBe(1);
    expect(project.title).toBe('Portafolio');
  });

  it('filterByTechnology() debería filtrar correctamente', async () => {
    const jsProjects = await Project.filterByTechnology('JS');
    expect(jsProjects.length).toBe(1);
    expect(jsProjects[0].title).toBe('Portafolio');
  });
});
