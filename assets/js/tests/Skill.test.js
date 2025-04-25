describe('Skill Model', () => {
  let mockSkills;
  let originalFetch;

  beforeAll(() => {
    // Guardar fetch original y crear mock
    originalFetch = window.fetch;
    window.fetch = jasmine.createSpy('fetch');
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
        name: 'HTML5',
        level: 'Intermedio',
        category: 'Frontend',
        yearsOfExperience: 2
      },
      {
        id: 3,
        name: 'CSS3',
        level: 'Intermedio',
        category: 'Frontend'
      }
    ];

    // Configurar mock para estas pruebas
    fetch.and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ skills: mockSkills })
      })
    );
  });

  afterAll(() => {
    // Restaurar fetch original
    window.fetch = originalFetch;
  });

  describe('Constructor', () => {
    it('debería crear una instancia con propiedades correctas', () => {
      const skill = new Skill(mockSkills[0]);
      
      expect(skill.id).toBe(1);
      expect(skill.name).toBe('JavaScript');
      expect(skill.level).toBe('Avanzado');
      expect(skill.category).toBe('Lenguajes');
      expect(skill.yearsOfExperience).toBe(3);
    });

    it('debería usar valores por defecto cuando no se proporcionan', () => {
      const partialData = { id: 4, name: 'React', category: 'Librerías' };
      const skill = new Skill(partialData);
      
      expect(skill.level).toBeUndefined();
      expect(skill.yearsOfExperience).toBe(0);
    });
  });

  describe('Métodos estáticos', () => {
    it('all() debería retornar todas las habilidades', async () => {
      const skills = await Skill.all();
      
      expect(skills.length).toBe(3);
      expect(skills[0]).toBeInstanceOf(Skill);
      expect(skills[1].name).toBe('HTML5');
      expect(fetch).toHaveBeenCalledWith('/_data/db.json');
    });

    it('findByCategory() debería filtrar habilidades por categoría', async () => {
      const frontendSkills = await Skill.findByCategory('Frontend');
      
      expect(frontendSkills.length).toBe(2);
      expect(frontendSkills[0].name).toBe('HTML5');
      expect(frontendSkills[1].name).toBe('CSS3');
    });

    it('findByLevel() debería filtrar habilidades por nivel', async () => {
      const advancedSkills = await Skill.findByLevel('Avanzado');
      
      expect(advancedSkills.length).toBe(1);
      expect(advancedSkills[0].name).toBe('JavaScript');
    });
  });

  describe('Manejo de errores', () => {
    it('debería manejar errores en all()', async () => {
      fetch.and.returnValue(Promise.reject(new Error('Network error')));
      
      const skills = await Skill.all();
      expect(skills).toEqual([]);
    });

    it('debería manejar respuestas no exitosas', async () => {
      fetch.and.returnValue(Promise.resolve({ ok: false }));
      
      const skills = await Skill.all();
      expect(skills).toEqual([]);
    });
  });
});
