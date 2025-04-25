describe('Skill Model', () => {
  let mockSkills;

  beforeAll(() => {
    // Mock global.fetch para el navegador
    window.fetch = jasmine.createSpy('fetch');
  });

  beforeEach(() => {
    mockSkills = [
      { id: 1, name: 'JavaScript', level: 'Avanzado', category: 'Lenguajes' },
      { id: 2, name: 'HTML', level: 'Intermedio', category: 'Frontend' }
    ];
    
    fetch.and.returnValue(Promise.resolve({
      json: () => Promise.resolve({ skills: mockSkills })
    }));
  });

  it('debería crear una instancia con propiedades correctas', () => {
    const skill = new Skill(mockSkills[0]);
    expect(skill.id).toBe(1);
    expect(skill.name).toBe('JavaScript');
    expect(skill.level).toBe('Avanzado');
    expect(skill.category).toBe('Lenguajes');
  });

  it('all() debería retornar todas las habilidades', async () => {
    const skills = await Skill.all();
    expect(skills.length).toBe(2);
    expect(skills[0]).toBeInstanceOf(Skill);
    expect(skills[0].name).toBe('JavaScript');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('db.json'));
  });

  it('findByCategory() debería filtrar habilidades', async () => {
    const skills = await Skill.findByCategory('Lenguajes');
    expect(skills.length).toBe(1);
    expect(skills[0].name).toBe('JavaScript');
  });
});
