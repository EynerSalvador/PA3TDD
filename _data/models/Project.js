class Project {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.technologies = data.technologies || [];
    this.url = data.url || '#';
  }

  static all() {
    return fetch('/portfolio-jekyll/_data/db.json')
      .then(response => response.json())
      .then(data => data.projects.map(project => new Project(project)));
  }

  static find(id) {
    return this.all().then(projects => projects.find(p => p.id === id));
  }
}

// Para usar en Node.js (Jekyll) y navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Project;
}
