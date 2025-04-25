describe('Project Model', () => {
  beforeEach(() => {
    // Mock de fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          projects: [
            { id: 1, title: 'Test Project', description: 'Test Desc' }
          ]
        })
      })
    );
  });

  test('should create a project instance', () => {
    const project = new Project({ id: 1, title: 'Test' });
    expect(project.title).toBe('Test');
  });

  test('all() should return array of projects', async () => {
    const projects = await Project.all();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0] instanceof Project).toBe(true);
  });

  test('find() should return a project by id', async () => {
    const project = await Project.find(1);
    expect(project.id).toBe(1);
  });
});
