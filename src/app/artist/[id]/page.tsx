'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Groups } from '@/lib/type/artist';
import { useParams } from 'next/navigation';

export default function Page() {
  const [artist, setArtist] = useState<Groups[] | null>(null);
  const [groups, setGroup] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]); // 이미지 URL 상태
  const [names, setNames] = useState<string[]>([]); // artist 이름 상태
  const [birthday, setArtistBirthday] = useState<string[]>([]); // artist 생일 상태

  const [currentIndex, setCurrentIndex] = useState(0); // 캐러셀 위치 상태 관리
  const [largeImageSrc, setLargeImageSrc] = useState<string>(''); // 큰 이미지 상태 관리
  const itemsPerView = 7; // 한 번에 보이는 이미지 수

  const supabase = createClient();

  const { id } = useParams();

  const urlId = decodeURIComponent(id);

  useEffect(() => {
    if (id) {
      getGroups(urlId as string); // id가 있을 경우 그룹 정보 가져오기
    }
  }, [id]); // id가 변경될 때마다 실행

  // id에 맞는 artist 정보 가져오기
  async function getGroups(groupId: string) {
    try {
      const { data, error } = await supabase.from('artists').select('*').eq(`group`, groupId); // URL의 id를 사용하여 그룹 조회해야함

      console.log(groupId);

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setArtist(data);

      console.log(data);

      const artistGroup = data?.map((element) => element.group) || [];
      setGroup(artistGroup);

      const imageUrls = data?.map((element) => element.image) || [];
      setImages(imageUrls);

      const artistName = data?.map((element) => element.name) || [];
      setNames(artistName);

      const artistBirthday = data?.map((element) => element.birthday) || [];
      setArtistBirthday(artistBirthday);

      if (imageUrls.length > 0) {
        setLargeImageSrc(imageUrls[0]); // 첫 번째 이미지를 초기값으로 설정
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }

  // console.log(groups);
  // console.log(images);

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
        <img
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
                <img
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
                  {names[index]}
                </div>
                <div>이름 : {names[index]}</div>
                <div>생일 : {birthday[index]}</div>
                <div>소속 :{groups[index]} </div>
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
