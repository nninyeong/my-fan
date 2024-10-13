import Calendar from '@/components/calendar/Calendar';
import { Schedule } from '@/lib/type/scheduleTypes';
import { createClient } from '@/utils/supabase/server';
import { getDaysInMonth, getMonth, getYear } from 'date-fns';
import ScheduleList from '@/components/calendar/ScheduleList';

export default async function page({ params }: { params: { id: string } }) {
  const artistId = params.id;

  const today = new Date();
  const year = getYear(today);
  const month = getMonth(today) + 1;
  const daysInMonth = getDaysInMonth(today);
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-${daysInMonth}}`;

  const serverClient = createClient();
  const { data: initialSchedules, error } = await serverClient
    .from<Schedule>('schedule')
    .select()
    .eq('artist_id', artistId)
    .gte('date', startDate)
    .lt('date', endDate)
    .order('date', { ascending: true });

  return (
    <div className='flex justify-center items-center gap-10 w-full mt-14'>
      <div className='border w-[900px] h-[600px]'>
        {/*TODO: artist params id로 동적 라우팅된다면 id -> 아티스트 이름을 알 수 있는지 확인 필요, 안된다면 메인에서 넘어올 때 zustand 이용?*/}
        <h3>{artistId} 스케쥴</h3>
        <Calendar
          initialDate={today}
          initialSchedules={initialSchedules}
          artistId={artistId}
        />
      </div>
      <ScheduleList initialSchedules={initialSchedules} />
    </div>
  );
}
