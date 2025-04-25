class Skill {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.level = data.level;
    this.category = data.category;
  }

  static all() {
    return fetch('/_data/db.json')
      .then(response => response.json())
      .then(data => data.skills.map(skill => new Skill(skill)));
  }

  static findByCategory(category) {
    return this.all().then(skills => skills.filter(s => s.category === category));
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Skill;
}
