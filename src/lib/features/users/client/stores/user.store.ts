import { writable } from 'svelte/store'
import type { UserOut } from 'users/models/user-out.dto'

export const userStore = writable<UserOut | null>(null)
