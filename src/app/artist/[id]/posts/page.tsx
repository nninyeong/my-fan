import { Input } from '@/components/ui/input';

export default function Post() {
  return (
    <div>
      <div>
        <div>
          <span>제목</span>
          <Input type='text' />
        </div>
        <div>
          <span>내용</span>
          <textarea
            name=''
            id=''
          ></textarea>
        </div>
        <div>
          <button>취소</button>
          <button>완료</button>
        </div>
      </div>
    </div>
  );
}
