describe('Project Model', () => {
  let mockProjects = [
    {
      id: 1,
      title: 'Portafolio',
      description: 'Mi portafolio profesional',
      technologies: ['JS', 'HTML'],
      url: 'https://ejemplo.com'
    }
  ];

  beforeEach(() => {
    fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ projects: mockProjects })
      })
    );
  });

  it('debería existir la clase Project', () => {
    expect(typeof Project).toBe('function');
  });

  describe('Constructor', () => {
    it('debería crear instancias correctamente', () => {
      const project = new Project(mockProjects[0]);
      expect(project.id).toBe(1);
      expect(project.title).toBe('Portafolio');
    });
  });

  describe('Métodos estáticos', () => {
    it('all() debería retornar proyectos', async () => {
      const projects = await Project.all();
      expect(projects.length).toBe(1);
      expect(projects[0].title).toBe('Portafolio');
    });

    it('find() debería encontrar por ID', async () => {
      const project = await Project.find(1);
      expect(project.id).toBe(1);
    });

    it('filterByTechnology() debería filtrar', async () => {
      const projects = await Project.filterByTechnology('JS');
      expect(projects.length).toBe(1);
    });
  });
});
