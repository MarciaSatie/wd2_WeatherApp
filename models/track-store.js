import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("tracks");

export const trackStore = {
  async getAllTracks() {
    await db.read();
    return db.data.tracks;
  },

  async addTrack(stationId, track) {
    await db.read();
    track._id = v4();
    track.stationid = stationId;
    db.data.tracks.push(track);
    await db.write();
    return track;
  },

  async getTracksBystationId(id) {
    await db.read();
    return db.data.tracks.filter((track) => track.stationid === id);
  },

  async getTrackById(id) {
    await db.read();
    return db.data.tracks.find((track) => track._id === id);
  },

  async deleteTrack(id) {
    await db.read();
    const index = db.data.tracks.findIndex((track) => track._id === id);
    db.data.tracks.splice(index, 1);
    await db.write();
  },

  async deleteAllTracks() {
    db.data.tracks = [];
    await db.write();
  },

  async updateTrack(track, updatedTrack) {
    track.title = updatedTrack.title;
    track.artist = updatedTrack.artist;
    track.duration = updatedTrack.duration;
    await db.write();
  },
};





