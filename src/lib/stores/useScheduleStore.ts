import { create } from 'zustand';

type ScheduleStore = {
  selectedDate: number | null;
  selectDate: (date: number | null) => void;
};

const useScheduleStore = create<ScheduleStore>((set) => ({
  selectedDate: null,
  selectDate: (date) => set({ selectedDate: date }),
}));

export default useScheduleStore;
