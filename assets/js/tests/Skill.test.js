describe('Skill Model', () => {
  let mockSkills;

  beforeEach(() => {
    mockSkills = [
      { id: 1, name: 'JavaScript', category: 'Lenguajes' },
      { id: 2, name: 'HTML', category: 'Frontend' }
    ];
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ skills: mockSkills })
      })
    );
  });

  // Usa it() en lugar de test()
  it('debería crear una instancia con propiedades correctas', () => {
    const skill = new Skill(mockSkills[0]);
    expect(skill.name).toBe('JavaScript');
    expect(skill.category).toBe('Lenguajes');
  });

  it('all() debería retornar todas las habilidades', async () => {
    const skills = await Skill.all();
    expect(skills.length).toBe(2);
    expect(skills[0]).toBeInstanceOf(Skill);
  });

  it('findByCategory() debería filtrar habilidades', async () => {
    const skills = await Skill.findByCategory('Lenguajes');
    expect(skills.length).toBe(1);
    expect(skills[0].name).toBe('JavaScript');
  });
});
