import Calendar from '@/components/calendar/Calendar';
import { Schedule } from '@/lib/type/scheduleTypes';

export default function page({ params }: { params: { id: string } }) {
  // TODO: 현재 year-month 로 등록돼있는 일정 && artistId === artist_id 컬럼의 값 인 일정만 fetch -> Calendar에 initialSchedules로 전달
  const today = new Date();
  const artistId = params.id;

  // supabase db와 연결 전 임시데이터
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
      date: '2024-10-01',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 1,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-01',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 1,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-01',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 1,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-01',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 1,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-01',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 1,
      artist_id: 1,
      user_id: 1,
      date: '2024-10-01',
      title: '유저1, 10주년 기념 콘서트',
      content: 'content 내용',
      description: 'description내용',
    },
    {
      id: 2,
      artist_id: 1,
      user_id: 2,
      date: '2024-10-12',
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
        {/*TODO: artist params id로 동적 라우팅된다면 id -> 아티스트 이름을 알 수 있는지 확인 필요, 안된다면 메인에서 넘어올 때 zustand 이용?*/}
        <h3>{artistId} 스케쥴</h3>
        <Calendar
          initialDate={today}
          initialSchedules={initialSchedules}
          artistId={artistId}
        />
      </div>
      <div className='border w-[300px] h-[600px]'></div>
    </div>
  );
}
