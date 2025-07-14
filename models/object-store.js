import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("objects");

export const stationStore = {
  async getAllObjects() {
    await db.read();
    return db.data.objects;
  },

  async addObject(object) {
    await db.read();
    station._id = v4();
    db.data.objects.push(object);
    await db.write();
    return object;
  },

  async getObjectById(id) {
    await db.read();
    const list = db.data.objects.find((object) => object._id === id);
    return list;
  },

  async deleteobjectById(id) {
    await db.read();
    const index = db.data.objects.findIndex((object) => object._id === id);
    db.data.objects.splice(index, 1);
    await db.write();
  },

  async deleteAllObjects() {
    db.data.objectss = [];
    await db.write();
  },
};

