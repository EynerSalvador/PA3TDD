
describe('Project Model', () => {
  let mockProjects;
  let originalFetch;

  beforeAll(() => {
    originalFetch = window.fetch;
    window.fetch = jasmine.createSpy('fetch');
  });

  beforeEach(() => {
    mockProjects = [
      {
        id: 1,
        title: 'Portafolio Profesional',
        description: 'Sitio web que muestra mis proyectos',
        technologies: ['Jekyll', 'JavaScript', 'HTML5'],
        url: 'https://ejemplo.com/portafolio',
        createdAt: '2023-01-01'
      },
      {
        id: 2,
        title: 'Blog Técnico',
        description: 'Artículos sobre desarrollo web',
        technologies: ['CSS3', 'JavaScript'],
        url: 'https://ejemplo.com/blog',
        createdAt: '2023-02-01'
      }
    ];

    fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects) // Changed from { projects: mockProjects }
      })
    );
  });

  afterAll(() => {
    window.fetch = originalFetch;
  });

  describe('Constructor', () => {
    it('debería crear una instancia con propiedades correctas', () => {
      const project = new Project(mockProjects[0]);
      
      expect(project.id).toBe(1);
      expect(project.title).toBe('Portafolio Profesional');
      expect(project.description).toContain('Sitio web');
      expect(project.technologies).toEqual(['Jekyll', 'JavaScript', 'HTML5']);
      expect(project.url).toBe('https://ejemplo.com/portafolio');
      expect(project.createdAt).toBe('2023-01-01');
    });

    it('debería usar valores por defecto cuando no se proporcionan', () => {
      const project = new Project({ id: 3, title: 'Proyecto' });
      
      expect(project.id).toBe(3);
      expect(project.title).toBe('Proyecto');
      expect(project.technologies).toEqual([]);
      expect(project.url).toBe('#');
      expect(project.createdAt).toBeDefined();
    });
  });

  describe('Métodos estáticos', () => {
    it('all() debería retornar todos los proyectos', async () => {
      const projects = await Project.all();
      
      expect(projects.length).toBe(2);
      expect(projects[0].title).toBe('Portafolio Profesional');
      expect(projects[1].title).toBe('Blog Técnico');
      expect(fetch).toHaveBeenCalled();
    });

    it('find() debería encontrar proyecto por ID', async () => {
      const project = await Project.find(1);
      
      expect(project).toBeInstanceOf(Project);
      expect(project.id).toBe(1);
      expect(project.title).toBe('Portafolio Profesional');
    });

    it('find() debería retornar undefined para ID inexistente', async () => {
      const project = await Project.find(99);
      expect(project).toBeUndefined();
    });

    it('filterByTechnology() debería filtrar proyectos por tecnología', async () => {
      const jsProjects = await Project.filterByTechnology('JavaScript');
      
      expect(jsProjects.length).toBe(2);
      expect(jsProjects[0].title).toBe('Portafolio Profesional');
      expect(jsProjects[1].title).toBe('Blog Técnico');

      const cssProjects = await Project.filterByTechnology('CSS3');
      expect(cssProjects.length).toBe(1);
      expect(cssProjects[0].title).toBe('Blog Técnico');
    });
  });

  describe('Manejo de errores', () => {
    it('debería manejar errores en all()', async () => {
      fetch.and.returnValue(Promise.reject(new Error('Network error')));
      
      await expectAsync(Project.all()).toBeRejectedWithError('Network error');
    });

    it('debería manejar respuestas no exitosas', async () => {
      fetch.and.returnValue(
        Promise.resolve({
          ok: false,
          status: 404
        })
      );
      
      await expectAsync(Project.all()).toBeRejected();
    });
  });
});
