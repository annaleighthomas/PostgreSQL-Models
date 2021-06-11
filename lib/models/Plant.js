import plants from '../controllers/plants.js';
import pool from '../utils/pool.js';

export default class Plant {
  id;
  name;
  type;
  sun;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.sun = row.sun;
  }

  static async createPlant({ name, type, sun }) {
    const { rows } = await pool.query(
      `INSERT INTO plants (name, type, sun)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, type, sun]
    );
    return new Plant(rows[0]);
  }

  static async findPlantById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM plants
      WHERE id = $1`
      , [id] 
    );
    return new Plant(rows[0]);
  }

  static async findAllPlants() {
    const { rows } = await pool.query(
      `SELECT * 
      FROM plants`
    );
    return rows.map(row => new Plant(row));
  }

  static async updatedPlantById(id, name, type, sun) {
    const { rows } = await pool.query(
      `UPDATE plants
      SET name = $1,
          type = $2,
          sun = $3
      WHERE id = $4
      RETURNING id, name, type, sun`
      , [name, type, sun, id]
    );
    return new Plant(rows[0]);
  }

  static async deletePlantById(id) {
    await pool.query(
      `DELETE FROM plants
      WHERE id = $1`
      , [id]
    );
  }
}
