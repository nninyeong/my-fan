import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const fetchSchedules = async (artistId: string, year: number, month: number) => {
  const client = createClient();

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const daysInMonth = getDaysInMonth(new Date(year, month - 1, 1));
  const endDate = `${year}-${String(month).padStart(2, '0')}-${daysInMonth}}`;

  const { data: schedules, error } = await client
    .from('schedule')
    .select()
    .eq('artist_id', artistId)
    .gte('date', startDate)
    .lt('date', endDate)
    .order('date', { ascending: true });

  if (error) throw new Error(error.message);

  return schedules;
};

export const useFetchSchedules = (artistId: string, initialDate: Date) => {
  const [year, setYear] = useState<number>(getYear(initialDate));
  const [month, setMonth] = useState<number>(getMonth(initialDate) + 1);

  const { data } = useQuery({
    queryKey: ['schedules', artistId],
    queryFn: async () => {
      return await fetchSchedules(artistId, year, month);
    },
  });

  return { data, year, month, setYear, setMonth };
};
