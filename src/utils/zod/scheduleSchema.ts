import { z } from 'zod';

export const scheduleSchema = z.object({
  title: z.string().min(1, { message: '스케줄 이름을 입력해주세요.' }),
  description: z.string().min(1, { message: '상세정보를 입력해주세요.' }),
  date: z
    .date({ invalid_type_error: '날짜는 Date 객체여야 합니다.' })
    .nullable()
    .refine((d) => d !== null, {
      message: '날짜는 필수 항목입니다.',
    }),
  content: z.string().nullable(),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;
