import { createClient } from '@/utils/supabase/server';

const getInitialSchedules = async (artistId: string, startDate: string, endDate: string) => {
  const serverClient = createClient();

  const { data: initialSchedules } = await serverClient
    .from('schedule')
    .select()
    .eq('artist_id', artistId)
    .gte('date', startDate)
    .lt('date', endDate)
    .order('date', { ascending: true });

  return initialSchedules;
};

export default getInitialSchedules;
