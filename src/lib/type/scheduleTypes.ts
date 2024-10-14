import { Database } from '@/lib/type/database.types';

export type Schedule = Database['public']['Tables']['schedule']['Row'];

export type CalendarInitDataType = {
  initialDate: Date;
  artistId: string;
};
