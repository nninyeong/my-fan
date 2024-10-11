import Calendar from '@/components/calendar/Calendar';
import { Schedule } from '@/lib/type/scheduleTypes';

export default function page() {
  const today = new Date();

  // TODO: 이번 달로 등록돼있는 일정 데이터 fetch -> Calendar에 initialSchedules로 전달
  const initialSchedules: Schedule[] = [
    {
      id: 0,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-11',
      title: '유저1, 앨범 발매 기념 사인회',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 1,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-11',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 2,
      artist_id: 1,
      user_id: 2,
      date: '2024-10-11',
      title: '유저2, 대전 빵축제 축하공연',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 3,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-11',
      title: '유저1, 앨범 발매 기념 사인회 2회차',
      content: 'content 내용',
      description: 'description내용',
    },
  ];

  return (
    <div className='flex justify-center items-center gap-10 w-full mt-14'>
      <div className='border w-[900px] h-[600px]'>
        <h3>ㅇㅇㅇ 스케쥴</h3>
        <Calendar
          initialDate={today}
          initialSchedules={initialSchedules}
        />
      </div>
      <div className='border w-[300px] h-[600px]'></div>
    </div>
  );
}
