class Project {
  constructor(data) {
    this.id = data.id;
    this.title = data.title || '';
    this.description = data.description || '';
    this.technologies = data.technologies || [];
  }

  static async all() {
    const response = await fetch('_data/db.json');
    const data = await response.json();
    return data.projects.map(p => new Project(p));
  }

  static async find(id) {
    const projects = await this.all();
    return projects.find(p => p.id === id);
  }
}

// Para compatibilidad con Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Project;
}
