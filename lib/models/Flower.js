import pool from '../utils/pool.js';

export default class Flower {
  id;
  commonName;
  genus;
  type;

  constructor(row) {
    this.id = row.id;
    this.commonName = row.commonName;
    this.genus = row.genus;
    this.type = row.type;
  }

  static async createFlower({ commonName, genus, type }) {
    const { rows } = await pool.query(
      `INSERT INTO flowers (common_name, genus, type)
      VALUES ($1, $2, $3)
      RETURNING id, common_name AS "commonName", genus, type`
      , [commonName, genus, type]
    );
    return new Flower(rows[0]);
  }

  static async findFlowerById(id) {
    const { rows } = await pool.query(
      `SELECT id, common_name AS "commonName", genus, type
      FROM flowers
      WHERE id = $1`
      , [id]
    );
    return new Flower(rows[0]);
  }

  static async findAllFlowers() {
    const { rows } = await pool.query(
      `SELECT id, common_name AS "commonName", genus, type
      FROM flowers`
    );
    return rows.map(row => new Flower(row));
  }

  static async updateFlowerById(id, commonName, genus, type) {
    const { rows } = await pool.query(
      `UPDATE flowers
      SET common_name = $1,
          genus = $2,
          type = $3
      WHERE id = $4
      RETURNING id, common_name AS "commonName", genus, type`
      , [commonName, genus, type, id]
    );
    return new Flower(rows[0]);
  }

  static async deleteFlower(id) {
    const { rows } = await pool.query(
      `DELETE FROM flowers
      WHERE id = $1
      RETURNING common_name AS "commonName", genus, type`
      , [id]
    );
    return new Flower(rows[0]);
  }
}
