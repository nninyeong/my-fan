import { getDay, startOfMonth } from 'date-fns';

/**
 * 입력한 날짜가 속한 달(month)이 어떤 요일에 시작하는지 반환
 * @param date - 시작 요일을 알고자하는 Date
 * @return 요일의 index (0: 일요일 ~ 6: 토요일)
 */
export const getFirstDayOfMonth = (date: Date): number => {
  const startDate = startOfMonth(date);
  return getDay(startDate);
};

/**
 * 캘린더 날짜와 스케쥴의 날짜가 일치하는지 확인
 * @param calendarDate - 캘린더의 날짜 (date)
 * @param scheduleDate - 스케쥴의 날짜 ('2024-10-10')
 * @return 일치 여부
 */
export const isSameDay = (calendarDate: number, scheduleDate: string): boolean => {
  return +scheduleDate.split('-')[2] === calendarDate;
};
