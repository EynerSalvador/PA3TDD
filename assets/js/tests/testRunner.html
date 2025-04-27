describe('Modelo Project', () => {
  // Datos de prueba
  const testProjectData = {
    id: 1,
    title: "Proyecto de Prueba",
    description: "Descripción de prueba",
    technologies: ["Jekyll", "JavaScript"],
    url: "https://ejemplo.com"
  };

  describe('Constructor', () => {
    it('debería crear instancias correctamente', () => {
      const project = new Project(testProjectData);
      
      expect(project.id).toBe(1);
      expect(project.title).toBe("Proyecto de Prueba");
      expect(project.technologies).toEqual(["Jekyll", "JavaScript"]);
      expect(project.url).toBe("https://ejemplo.com");
      expect(project.createdAt).toBeDefined();
    });

    it('debería usar valores por defecto cuando corresponda', () => {
      const project = new Project({ id: 2 });
      
      expect(project.title).toBe("Sin título");
      expect(project.technologies).toEqual([]);
      expect(project.url).toBe("#");
    });
  });

  describe('Métodos estáticos', () => {
    beforeEach(() => {
      // Configurar mock para estas pruebas
      fetch.and.returnValue(
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
           projects: [{ id: 1, title: "Test Project" }]
          })
        })
      );
    });

    it('all() debería retornar proyectos', async () => {
      const projects = await Project.all();
      
      expect(projects.length).toBe(1);
      expect(projects[0]).toBeInstanceOf(Project);
      expect(fetch).toHaveBeenCalledWith('/PA3TDD/_data/db.json');
    });

    it('find() debería encontrar por ID', async () => {
      const project = await Project.find(1);
      
      expect(project).toBeDefined();
      expect(project.id).toBe(1);
    });

    it('filterByTechnology() debería filtrar correctamente', async () => {
      const projects = await Project.filterByTechnology("Jekyll");
      
      expect(projects.length).toBe(1);
      expect(projects[0].title).toBe("Proyecto de Prueba");
    });
  });

  describe('Manejo de errores', () => {
    it('debería lanzar error con datos inválidos', () => {
      expect(() => new Project(null)).toThrow();
    });

    it('debería manejar errores en all()', async () => {
      fetch.and.returnValue(Promise.reject(new Error("Network error")));
      
      try {
        await Project.all();
        fail("Debería haber lanzado un error");
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });
});
