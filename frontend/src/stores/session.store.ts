import { create } from 'zustand'
import type { SessionStore } from '../models/session-store.model'
import { SessionService } from '../services/session.service'

export const useSessionStore = create<SessionStore>((set) => ({
	user: SessionService.user,
	setUser: (value) => set({ user: value })
}))
