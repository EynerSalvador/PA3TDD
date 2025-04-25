class Project {
  /**
   * Constructor del modelo Project
   * @param {Object} data - Datos del proyecto
   * @param {number} data.id - ID del proyecto
   * @param {string} data.title - Título del proyecto
   * @param {string} data.description - Descripción del proyecto
   * @param {Array} [data.technologies=[]] - Tecnologías utilizadas
   * @param {string} [data.url='#'] - URL del proyecto
   */
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.technologies = data.technologies || [];
    this.url = data.url || '#';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  /**
   * Obtiene todos los proyectos
   * @static
   * @returns {Promise<Project[]>} Array de instancias de Project
   */
  static async all() {
    try {
      const response = await fetch('/_data/db.json');
      if (!response.ok) throw new Error('Error al cargar proyectos');
      const data = await response.json();
      return data.projects.map(project => new Project(project));
    } catch (error) {
      console.error('Project.all() error:', error);
      return [];
    }
  }

  /**
   * Encuentra un proyecto por ID
   * @static
   * @param {number} id - ID del proyecto a buscar
   * @returns {Promise<Project|undefined>} Instancia de Project o undefined
   */
  static async find(id) {
    try {
      const projects = await this.all();
      return projects.find(project => project.id === id);
    } catch (error) {
      console.error('Project.find() error:', error);
      return undefined;
    }
  }

  /**
   * Filtra proyectos por tecnología
   * @static
   * @param {string} technology - Tecnología a filtrar
   * @returns {Promise<Project[]>} Proyectos que usan la tecnología
   */
  static async filterByTechnology(technology) {
    const projects = await this.all();
    return projects.filter(project => 
      project.technologies.includes(technology)
    );
  }

  /**
   * Convierte el proyecto a formato JSON
   * @returns {Object} Representación JSON del proyecto
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      technologies: this.technologies,
      url: this.url,
      createdAt: this.createdAt
    };
  }
}

// Export para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Project;
}
