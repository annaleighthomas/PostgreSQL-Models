import pool from '../utils/pool.js';

export default class Fruit {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color =  row.color;
  }

  static async createFruit({ name, color }) {
    const { rows } = await pool.query(
      `INSERT INTO fruits (name, color)
      VALUES ($1, $2)
      RETURNING *`
      , [name, color]
    );
    return new Fruit(rows[0]);
  }
  static async findFruitById(id) {
    const { rows } = await pool.query(
      `SELECT *
      FROM fruits
      WHERE id = $1`
      , [id]
    );
    return new Fruit(rows[0]);
  }

  static async findAllFruits() {
    const { rows } = await pool.query(
      `SELECT *
      FROM fruits`
    );
    return rows.map(row => new Fruit(row));
  }

  static async updateFruitById(id, name, color) {
    const { rows } = await pool.query(
      `UPDATE fruits
      SET name = $1, 
          color = $2
      WHERE id = $3
      RETURNING id, name, color`
      , [name, color, id]
    );
    return new Fruit(rows[0]);
  }

  static async deleteFruitById(id) {
    const { rows } = await pool.query(
      `DELETE FROM fruits
      WHERE id = $1
      RETURNING *`
      , [id]
    );
    return new Fruit(rows[0]);
  }

}