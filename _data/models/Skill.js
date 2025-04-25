class Skill {
  constructor(data) {
    this.id = data.id;
    this.name = data.name || '';
    this.level = data.level || '';
    this.category = data.category || '';
  }

  static async all() {
    const response = await fetch('_data/db.json');
    const data = await response.json();
    return data.skills.map(s => new Skill(s));
  }

  static async findByCategory(category) {
    const skills = await this.all();
    return skills.filter(s => s.category === category);
  }
}

// Para compatibilidad con Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Skill;
}
