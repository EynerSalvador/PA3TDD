// Mock de fetch para que devuelva datos simulados en las pruebas
if (!window.fetch) {
  window.fetch = function() {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        projects: [
          { id: 1, title: "Project 1", description: "A project", technologies: ["JavaScript"], url: "http://example.com", createdAt: "2021-01-01" },
          { id: 2, title: "Project 2", description: "Another project", technologies: ["HTML", "CSS"], url: "http://example2.com", createdAt: "2021-02-01" }
        ]
      })
    });
  };
}

// Importa la clase Project
import Project from '../../assets/js/Project.js';

describe('Modelo Project', () => {

  // Métodos estáticos
  describe('Métodos estáticos', () => {

    it('debería retornar proyectos', async () => {
      const projects = await Project.all();
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);
      expect(projects[0].title).toBe("Project 1");
    });

    it('debería encontrar por ID', async () => {
      const project = await Project.find(1);
      expect(project).toBeDefined();
      expect(project.id).toBe(1);
      expect(project.title).toBe("Project 1");
    });

    it('debería filtrar correctamente por tecnología', async () => {
      const projects = await Project.filterByTechnology("JavaScript");
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);
      expect(projects[0].technologies).toContain("JavaScript");
    });
  });

  // Constructor
  describe('Constructor', () => {

    it('debería usar valores por defecto cuando corresponda', () => {
      const project = new Project({});
      expect(project.title).toBe("Sin título");
    });

    it('debería crear instancias correctamente', () => {
      const projectData = { id: 1, title: "Project 1", description: "A project", technologies: ["JavaScript"], url: "http://example.com", createdAt: "2021-01-01" };
      const project = new Project(projectData);
      expect(project.id).toBe(1);
      expect(project.title).toBe("Project 1");
    });
  });
});
