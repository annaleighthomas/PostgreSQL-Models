import pool from '../utils/pool.js';

export default class Cat {
  id;
  name;
  type;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.color = row.color;
  }


  static async createCat({ name, type, color }) {
    const { rows } = await pool.query(
      `INSERT INTO cats (name, type, color)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, type, color]
    );
    return new Cat(rows[0]);
  }

  static async findCatById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM cats
      WHERE id = $1`
      , [id]
    );
    return new Cat(rows[0]);
  }

  static async findAllCats() {
    const { rows } = await pool.query(
      `SELECT *
      FROM cats`
    );
    return rows.map(row => new Cat(row));
  }

  static async updateCatById(id, name, type, color) {
    const { rows } = await pool.query(
      `UPDATE cats
      SET name = $1, 
          type = $2,
          color = $3
      WHERE id = $4
      RETURNING id, name, type, color`
      , [name, type, color, id]
    );
    return new Cat(rows[0]);
  }

  static async deleteCatById(id) {
    const { rows } = await pool.query(
      `DELETE FROM cats
      WHERE id = $1
      RETURNING *`
      , [id]
    );
    return new Cat(rows[0]);
  }

}
