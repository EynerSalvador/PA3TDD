// Versión mejorada con manejo de errores
class Project {
  constructor(data) {
    if (!data) throw new Error('Datos de proyecto no proporcionados');
    
    this.id = data.id || 0;
    this.title = data.title || 'Sin título';
    this.description = data.description || '';
    this.technologies = Array.isArray(data.technologies) ? data.technologies : [];
    this.url = data.url || '#';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static async all() {
    try {
      const response = await fetch('/PA3TDD/_data/db.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (!data.projects) throw new Error('Formato de datos inválido');
      
      return data.projects.map(project => new Project(project));
    } catch (error) {
      console.error('Error en Project.all():', error);
      throw error;
    }
  }

  static async find(id) {
    const projects = await this.all();
    return projects.find(project => project.id === id);
  }

  static async filterByTechnology(technology) {
    const projects = await this.all();
    return projects.filter(project => 
      project.technologies.includes(technology)
    );
  }

  // Método para uso en console.log
  toString() {
    return `Project#${this.id} ${this.title}`;
  }
}

// Export para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Project;
}
