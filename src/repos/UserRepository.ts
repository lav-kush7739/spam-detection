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

  public async checkIfPhoneEmailExists(phone: string, email:string | undefined) {
    const query = `SELECT name from users WHERE phone = $1 OR email=$2`;
    const values = [phone,email];
    const result = await Database.executeQuery(query, values);
    return result.rows.length > 0;
  }

  public async userLogin(name: string, phone: string) {
    const query = `SELECT name from users where name=$1 and phone=$2;`;
    const values = [name, phone];
    const result = await Database.executeQuery(query, values);
    return result.rows;
  }

  public async addToContacts(userId: number, name: string, phone: string) {
    const query = `INSERT INTO contacts (user_id,name,phone) values ($1,$2,$3)`;
    const values = [userId,name, phone];
    await Database.executeQuery(query, values);
  }
}
