import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Schedule, ScheduleInsert } from '@/lib/type/scheduleTypes';

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

const insertSchedule = async (input: ScheduleInsert): Promise<Schedule> => {
  const client = createClient();

  const { data, error } = await client
    .from('schedule')
    .insert({
      title: input.title,
      date: input.date,
      description: input.description,
      content: input.content || null,
      artist_id: input.artist_id,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const useMutateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertSchedule,
    onSuccess: (data: Schedule) => {
      queryClient.invalidateQueries({
        queryKey: ['schedules', data.artist_id],
      });
    },
  });
};

const deleteSchedule = async (scheduleId: string): Promise<Schedule> => {
  const client = createClient();

  const { data, error } = await client.from('schedule').delete().eq('id', scheduleId).select().single();

  if (error) throw new Error(error.message);

  return data;
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data: Schedule) => {
      queryClient.invalidateQueries({
        queryKey: ['schedules', data.artist_id],
      });
    },
  });
};
