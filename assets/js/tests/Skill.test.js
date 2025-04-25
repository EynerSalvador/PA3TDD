describe('Skill Model', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          skills: [
            { id: 1, name: 'JavaScript', category: 'Lenguajes' }
          ]
        })
      })
    );
  });

  test('should create a skill instance', () => {
    const skill = new Skill({ id: 1, name: 'Test' });
    expect(skill.name).toBe('Test');
  });

  test('findByCategory() should filter skills', async () => {
    const skills = await Skill.findByCategory('Lenguajes');
    expect(skills.length).toBe(1);
  });
});
