import Database from "./Database.js";

export default class UserRepository {
  public async userRegister(
    name: string,
    phone: string,
    password: string,
    email?: string
  ) {
    const query = `INSERT INTO users (name,phone,password,email,created_at,updated_at) values ($1,$2,$3,$4,$5,$6) returning id`;
    const values = [name, phone, password, email, new Date(), new Date()];
    const result = await Database.executeQuery(query, values);
    return result.rows[0].id;
  }
}
