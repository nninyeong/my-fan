'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Groups } from '@/lib/type/artist';

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0); // 캐러셀 위치 상태 관리
  const [largeImageSrc, setLargeImageSrc] = useState(images[0]); // 큰 이미지 상태 관리
  const itemsPerView = 7; // 한 번에 보이는 이미지 수

  const [groups, setGroups] = useState<Groups[] | null>(null);
  const [images, setImages] = useState<string[]>([]); // 이미지 URL 상태
  const [names, setNames] = useState<string[]>([]); // 이미지 이름 상태

  const supabase = createClient();

  useEffect(() => {
    getGroups();
  }, []);

  async function getGroups() {
    const { data } = await supabase.from('group_artists').select('*');

    setGroups(data);
    if (data) {
      setGroups(data);
      // 이미지 URL과 이름을 데이터에서 추출
      const imageUrls = data.map((group) => group.imageUrl); // imageUrl 컬럼에서 URL 추출
      const imageNames = data.map((group) => group.member.); // name 컬럼에서 이름 추출

      setImages(imageUrls);
      setNames(imageNames);
      setLargeImageSrc(imageUrls[0]); // 첫 번째 이미지로 초기화
    }

    console.log(data);
  }

  // 캐러셀 이동 및 처음 이지미에서 멈춤
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // 캐러셀 이동 및 마지막 이미지에서 멈춤
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - itemsPerView));
  };

  // 클릭한 캐러셀 이미지로 큰 이미지 변경하는 함수
  const handleImageClick = (index: number) => {
    setLargeImageSrc(images[index]); // 클릭한 이미지로 큰 이미지 변경
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <div className='p-4'>
        <Image
          src={largeImageSrc}
          alt='Large Image'
          width={1200}
          height={1600}
          className='w-96 h-96 rounded-lg shadow-lg'
        />
      </div>

      <div className='relative w-full mt-8'>
        <button
          className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10'
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &#9664;
        </button>

        <div className='overflow-hidden mx-10'>
          <div
            className='flex transition-transform duration-300'
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {images.map((src, index) => (
              <div
                className='min-w-[14.2857%] p-2 relative'
                key={index}
              >
                <Image
                  className='w-full h-44 rounded-md shadow-md'
                  src={src}
                  alt={`Small Image ${index + 1}`}
                  width={400}
                  height={600}
                />

                <div
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg opacity-0 transition-opacity duration-300 hover:opacity-100'
                  onClick={() => handleImageClick(index)} // 이미지 클릭 시 큰 이미지 변경
                >
                  {name[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 z-10'
          disabled={currentIndex >= images.length - itemsPerView}
        >
          &#9654;
        </button>
      </div>
      <div></div>
    </div>
  );
}
