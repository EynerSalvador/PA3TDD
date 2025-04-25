describe('Skill Model', () => {
  let mockSkills = [
    {
      id: 1,
      name: 'JavaScript',
      level: 'Avanzado',
      category: 'Lenguajes'
    }
  ];

  beforeEach(() => {
    fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ skills: mockSkills })
      })
    );
  });

  it('debería existir la clase Skill', () => {
    expect(typeof Skill).toBe('function');
  });

  describe('Constructor', () => {
    it('debería crear instancias correctamente', () => {
      const skill = new Skill(mockSkills[0]);
      expect(skill.name).toBe('JavaScript');
    });
  });

  describe('Métodos estáticos', () => {
    it('all() debería retornar skills', async () => {
      const skills = await Skill.all();
      expect(skills.length).toBe(1);
    });

    it('findByCategory() debería filtrar', async () => {
      const skills = await Skill.findByCategory('Lenguajes');
      expect(skills.length).toBe(1);
    });
  });
});
