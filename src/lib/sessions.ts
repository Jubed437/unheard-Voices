interface Session {
  startedAt: number;
}

const globalForSessions = globalThis as unknown as { sessions: Map<string, Session> };

export const sessions: Map<string, Session> =
  globalForSessions.sessions ?? new Map();

if (process.env.NODE_ENV !== "production") globalForSessions.sessions = sessions;
