// _data/models/Project.js
class Project {
  constructor(data) {
    this.id = data.id;
    this.title = data.title || '';
    this.description = data.description || '';
    this.technologies = data.technologies || [];
    this.url = data.url || '#';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static async all() {
    const response = await fetch('/PA3TDD/_data/db.json');
    const data = await response.json();
    return data.projects.map(p => new Project(p));
  }

  static async find(id) {
    const projects = await this.all();
    return projects.find(p => p.id === id);
  }

  static async filterByTechnology(tech) {
    const projects = await this.all();
    return projects.filter(p => p.technologies.includes(tech));
  }
}

// Exportación para Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Project;
}
