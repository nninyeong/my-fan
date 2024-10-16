import { Database } from '@/lib/type/database.types';

export type Schedule = Database['public']['Tables']['schedule']['Row'];
export type ScheduleInsert = Database['public']['Tables']['schedule']['Insert'];
export type ScheduleUpdate = Database['public']['Tables']['schedule']['Update'];

export type CalendarInitDataType = {
  artistId: string;
};
