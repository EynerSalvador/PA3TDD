class Skill {
  /**
   * Constructor del modelo Skill
   * @param {Object} data - Datos de la habilidad
   * @param {number} data.id - ID de la habilidad
   * @param {string} data.name - Nombre de la habilidad
   * @param {string} data.level - Nivel de dominio
   * @param {string} data.category - Categoría de la habilidad
   */
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.level = data.level;
    this.category = data.category;
    this.yearsOfExperience = data.yearsOfExperience || 0;
  }

  /**
   * Obtiene todas las habilidades
   * @static
   * @returns {Promise<Skill[]>} Array de instancias de Skill
   */
  static async all() {
    try {
      const response = await fetch('/_data/db.json');
      if (!response.ok) throw new Error('Error al cargar habilidades');
      const data = await response.json();
      return data.skills.map(skill => new Skill(skill));
    } catch (error) {
      console.error('Skill.all() error:', error);
      return [];
    }
  }

  /**
   * Filtra habilidades por categoría
   * @static
   * @param {string} category - Categoría a filtrar
   * @returns {Promise<Skill[]>} Habilidades de la categoría
   */
  static async findByCategory(category) {
    try {
      const skills = await this.all();
      return skills.filter(skill => skill.category === category);
    } catch (error) {
      console.error('Skill.findByCategory() error:', error);
      return [];
    }
  }

  /**
   * Busca habilidades por nivel
   * @static
   * @param {string} level - Nivel a buscar (Ej: 'Avanzado')
   * @returns {Promise<Skill[]>} Habilidades del nivel especificado
   */
  static async findByLevel(level) {
    const skills = await this.all();
    return skills.filter(skill => skill.level === level);
  }

  /**
   * Convierte la habilidad a formato JSON
   * @returns {Object} Representación JSON de la habilidad
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      category: this.category,
      yearsOfExperience: this.yearsOfExperience
    };
  }
}

// Export para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Skill;
}
