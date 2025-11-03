// services/storage.js - Serviço para o localStorage
export class StorageService {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error("Storage save error", e);
    }
  }
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.error("Storage get error", e);
      return fallback;
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

export const storage = new StorageService();
