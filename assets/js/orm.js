class ORM {
  constructor(modelName, dbPath = '/portfolio-jekyll/_data/db.json') {
    this.modelName = modelName;
    this.dbPath = dbPath;
  }

  async all() {
    const response = await fetch(this.dbPath);
    const data = await response.json();
    return data[this.modelName];
  }

  async find(id) {
    const items = await this.all();
    return items.find(item => item.id === id);
  }

  async where(filterFn) {
    const items = await this.all();
    return items.filter(filterFn);
  }
}
