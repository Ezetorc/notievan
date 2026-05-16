import type { UserOut } from "../dtos/out/user-out.dto.js";

export type Session = {
  user: UserOut;
  token: string;
};
