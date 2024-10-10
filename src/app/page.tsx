import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardDemo } from '@/components/shared/CardDemo';
import { CarouselDemo } from '@/components/shared/CarouselDemo';
import { DialogDemo } from '@/components/shared/DialogDemo';

export default function Home() {
  return (
    <section className='grid justify-items-center min-h-screen py-8 pb-20 m-auto container'>
      <article className='flex flex-wrap flex-col gap-10 p-4'>
        <div className='txt'>
          <h2 className='font-bold'>example</h2>
        </div>
        <Button>button</Button>
        <Input />
        <CardDemo />
        <DialogDemo />
        <CarouselDemo />
        {/* <InputForm /> */}
      </article>
    </section>
  );
}
