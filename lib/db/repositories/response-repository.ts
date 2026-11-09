import { db } from "../index";
import { RecipientResponseRecord } from "../schema";
import { UniverseId } from "@/lib/types";

export const ResponseRepository = {
  addResponse(data: {
    universeId: UniverseId;
    recipientName: string;
    mood: string;
    message: string;
    audioAssetPath?: string;
  }) {
    const newRecord: RecipientResponseRecord = {
      id: `resp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      recipientId: data.universeId,
      recipientName: data.recipientName,
      mood: data.mood,
      messageText: data.message,
      audioAssetPath: data.audioAssetPath,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    db.mutate((s) => {
      s.responses.unshift(newRecord);
    });

    return newRecord;
  },

  getAllResponses() {
    return db.getState().responses;
  },

  markAsRead(id: string) {
    db.mutate((s) => {
      const resp = s.responses.find((r) => r.id === id);
      if (resp) resp.isRead = true;
    });
  },
};

