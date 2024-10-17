import { create } from 'zustand';

type ScheduleStore = {
  selectedDate: number | null;
  selectDate: (date: number | null) => void;
  calendarDate: Date;
  setCalendarDate: (date: Date) => void;
};

const useScheduleStore = create<ScheduleStore>((set) => ({
  selectedDate: null,
  selectDate: (date) => set({ selectedDate: date }),
  calendarDate: new Date(),
  setCalendarDate: (date) => set({ calendarDate: date }),
}));

export default useScheduleStore;
