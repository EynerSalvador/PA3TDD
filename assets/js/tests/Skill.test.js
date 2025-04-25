describe('Skill Model', () => {
  let mockSkills;

  beforeAll(() => {
    // Mock de fetch
    window.fetch = jasmine.createSpy('fetch').and.callFake(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          skills: mockSkills 
        })
      })
    );
  });

  beforeEach(() => {
    mockSkills = [
      {
        id: 1,
        name: 'JavaScript',
        level: 'Avanzado',
        category: 'Lenguajes',
        yearsOfExperience: 3
      },
      {
        id: 2,
        name: 'HTML',
        level: 'Intermedio',
        category: 'Frontend'
      }
    ];
  });

  it('debería crear una instancia con propiedades correctas', () => {
    const skill = new Skill(mockSkills[0]);
    expect(skill.id).toBe(1);
    expect(skill.name).toBe('JavaScript');
    expect(skill.level).toBe('Avanzado');
    expect(skill.yearsOfExperience).toBe(3);
  });

  it('all() debería retornar todas las habilidades', async () => {
    const skills = await Skill.all();
    expect(skills.length).toBe(2);
    expect(skills[0]).toBeInstanceOf(Skill);
    expect(fetch).toHaveBeenCalledWith('/_data/db.json');
  });

  it('findByCategory() debería filtrar por categoría', async () => {
    const frontendSkills = await Skill.findByCategory('Frontend');
    expect(frontendSkills.length).toBe(1);
    expect(frontendSkills[0].name).toBe('HTML');
  });

  it('findByLevel() debería filtrar por nivel', async () => {
    const advancedSkills = await Skill.findByLevel('Avanzado');
    expect(advancedSkills.length).toBe(1);
    expect(advancedSkills[0].name).toBe('JavaScript');
  });
});
