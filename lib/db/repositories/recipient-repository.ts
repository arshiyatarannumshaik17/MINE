import { db } from "../index";
import { UniverseId } from "@/lib/types";

export const RecipientRepository = {
  getRecipient(id: UniverseId) {
    const state = db.getState();
    return state.recipients.find((r) => r.id === id) || null;
  },

  getAllRecipients() {
    return db.getState().recipients;
  },

  getExperienceConfig(id: UniverseId) {
    const state = db.getState();
    return state.experiences.find((e) => e.recipientId === id) || null;
  },
};

