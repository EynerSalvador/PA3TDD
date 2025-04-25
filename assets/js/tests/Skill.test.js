describe('Skill Model', () => {
  it('debería existir la clase Skill', () => {
    expect(typeof Skill).toBe('function');
  });

  describe('all()', () => {
    it('debería retornar array de skills', async () => {
      const skills = await Skill.all();
      expect(skills).toBeDefined();
      expect(Array.isArray(skills)).toBe(true);
    });
  });

  describe('findByCategory()', () => {
    it('debería filtrar por categoría', async () => {
      const skills = await Skill.findByCategory('Lenguajes');
      expect(skills).toBeDefined();
      expect(Array.isArray(skills)).toBe(true);
    });
  });
});
