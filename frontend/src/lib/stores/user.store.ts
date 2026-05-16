import { writable } from 'svelte/store';
import type { UserOut } from 'shared/dtos/out/user-out.dto';

export const userStore = writable<UserOut | null>(null);
