describe('Project Model', () => {
  it('debería existir la clase Project', () => {
    expect(typeof Project).toBe('function');
  });

  describe('all()', () => {
    it('debería retornar array de proyectos', async () => {
      const projects = await Project.all();
      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
    });
  });

  describe('find()', () => {
    it('debería encontrar proyecto por ID', async () => {
      const project = await Project.find(1);
      expect(project).toBeDefined();
      expect(project.id).toBe(1);
    });
  });
});
