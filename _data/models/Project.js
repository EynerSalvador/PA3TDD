class Project {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.technologies = data.technologies || [];
    this.url = data.url || '#';
  }

  static async all() {
    const response = await fetch('_data/db.json');
    const data = await response.json();
    return data.projects.map(project => new Project(project));
  }

  static async find(id) {
    const projects = await this.all();
    return projects.find(p => p.id === id);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Project;
}
