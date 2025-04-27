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

// Importa la clase Project si estás usando módulos ES6
import Project from '../js/Project.js';  // Ajusta la ruta según corresponda

describe('Modelo Project', () => {
  
  // Configura las pruebas para verificar que los datos se obtienen correctamente
  describe('Métodos estáticos', () => {

    // Test para verificar que `all()` retorna proyectos correctamente
    it('debería retornar proyectos', async () => {
      const projects = await Project.all();
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);  // Verifica que haya proyectos
      expect(projects[0].title).toBe("Project 1");  // Verifica el título del primer proyecto
    });

    // Test para verificar que `find()` retorna el proyecto correcto por ID
    it('debería encontrar por ID', async () => {
      const project = await Project.find(1);
      expect(project).toBeDefined();
      expect(project.id).toBe(1);  // Verifica que el ID del proyecto sea correcto
      expect(project.title).toBe("Project 1");  // Verifica el título del proyecto
    });

    // Test para verificar que `filterByTechnology()` filtra correctamente por tecnología
    it('debería filtrar correctamente por tecnología', async () => {
      const projects = await Project.filterByTechnology("JavaScript");
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);  // Verifica que haya proyectos filtrados
      expect(projects[0].technologies).toContain("JavaScript");  // Verifica que la tecnología esté presente en el proyecto
    });
  });

  // Verificación del constructor
  describe('Constructor', () => {
    
    // Test para verificar que los valores predeterminados se usen cuando no se proporciona un título
    it('debería usar valores por defecto cuando corresponda', () => {
      const project = new Project({});
      expect(project.title).toBe("Sin título");  // Verifica que el título predeterminado sea "Sin título"
    });

    // Test para verificar que las instancias se creen correctamente
    it('debería crear instancias correctamente', () => {
      const projectData = { id: 1, title: "Project 1", description: "A project", technologies: ["JavaScript"], url: "http://example.com", createdAt: "2021-01-01" };
      const project = new Project(projectData);
      expect(project.id).toBe(1);  // Verifica que el ID sea el esperado
      expect(project.title).toBe("Project 1");  // Verifica que el título sea el esperado
    });
  });
});



// Importa la clase Project si estás usando módulos ES6

//import Project from '../js/Project.js';  // Ajusta la ruta según corresponda
import Project from '../../assets/js/Project.js';


describe('Modelo Project', () => {
  
  // Configura las pruebas para verificar que los datos se obtienen correctamente
  describe('Métodos estáticos', () => {

    // Test para verificar que `all()` retorna proyectos correctamente
    it('debería retornar proyectos', async () => {
      const projects = await Project.all();
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);  // Verifica que haya proyectos
      expect(projects[0].title).toBe("Project 1");  // Verifica el título del primer proyecto
    });

    // Test para verificar que `find()` retorna el proyecto correcto por ID
    it('debería encontrar por ID', async () => {
      const project = await Project.find(1);
      expect(project).toBeDefined();
      expect(project.id).toBe(1);  // Verifica que el ID del proyecto sea correcto
      expect(project.title).toBe("Project 1");  // Verifica el título del proyecto
    });

    // Test para verificar que `filterByTechnology()` filtra correctamente por tecnología
    it('debería filtrar correctamente por tecnología', async () => {
      const projects = await Project.filterByTechnology("JavaScript");
      expect(projects).toBeDefined();
      expect(projects.length).toBeGreaterThan(0);  // Verifica que haya proyectos filtrados
      expect(projects[0].technologies).toContain("JavaScript");  // Verifica que la tecnología esté presente en el proyecto
    });
  });

  // Verificación del constructor
  describe('Constructor', () => {
    
    // Test para verificar que los valores predeterminados se usen cuando no se proporciona un título
    it('debería usar valores por defecto cuando corresponda', () => {
      const project = new Project({});
      expect(project.title).toBe("Sin título");  // Verifica que el título predeterminado sea "Sin título"
    });

    // Test para verificar que las instancias se creen correctamente
    it('debería crear instancias correctamente', () => {
      const projectData = { id: 1, title: "Project 1", description: "A project", technologies: ["JavaScript"], url: "http://example.com", createdAt: "2021-01-01" };
      const project = new Project(projectData);
      expect(project.id).toBe(1);  // Verifica que el ID sea el esperado
      expect(project.title).toBe("Project 1");  // Verifica que el título sea el esperado
    });
  });
});
