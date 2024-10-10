import { create } from 'zustand'

type ScrollState = {
  visible: boolean
  setIsVisible: (visible: boolean) => void
}

const useScrollStore = create<ScrollState>((set) => ({
  visible: false,
  setIsVisible: (visible) => set({ visible })
}))

export default useScrollStore
