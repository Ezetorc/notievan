import type { UserOut } from "../../../shared/src/dtos/out/user-out.dto";

export type AuthResponse = { user: UserOut; token: string }
