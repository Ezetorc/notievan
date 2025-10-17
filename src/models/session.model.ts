import type { SanitizedUser } from "./sanitized-user.model";

export type Session = {
  user: SanitizedUser;
  token: string;
};
