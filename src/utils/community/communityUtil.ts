/**
 * 게시글 및 댓글 생성된 날짜를 포멧
 * @param createdDate - 게시글, 댓글 생성날자
 * @return 변환된 날짜 (형식 : 2024년 10월 15일 오후 03:49)
 */
export const formatDate = (createdDate: string): React.ReactNode => {
  console.log('createdDate', createdDate);

  const dateTime = new Date(createdDate);
  // 한국어 형식으로 날짜 및 시간 포맷
  const formattedDateTime = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long', // "10월" 형식
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12시간 형식 (오전/오후)
    timeZone: 'Asia/Seoul', // 한국 표준시로 변환
  }).format(dateTime);

  return formattedDateTime;
};
