
import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("users");

export const userStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },

  async updateUser(id, updates) {
    const user = await this.getUserById(id);
    if (!user) return null;

    // Only copy allowed fields
    const allowed = ["firstName", "lastName", "email", "password"];
    for (const key of allowed) {
      if (updates[key] !== undefined) {
        user[key] = updates[key];
      }
    }

    await db.write(); // persist to users.json (assuming initStore gives you write())
    return user;
  },

};
