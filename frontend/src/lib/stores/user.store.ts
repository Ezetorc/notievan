import type { UserOut } from 'shared/dtos/out/user-out.dto'
import { writable } from 'svelte/store'

export const userStore = writable<UserOut | null>(null)
