'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArtistData } from '../../../lib/type/artist';

const fetchArtistData = async () => {
  const res = await fetch(`/api/artist`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return await res.json();
};

// 더미데이터
const images = [
  'https://pimg.mk.co.kr/news/cms/202410/14/news-p.v1.20241014.c20146c4e9ee4d209074f962870654e4_P1.jpg',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710852366f195abc282c.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710849666f19590d4578.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710848966f195892fc06.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710846966f19575b20de.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710847566f1957b76d79.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710851666f195a49dc1b.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710850166f195957cce6.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710846466f1957090b1d.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710850966f1959d84b1c.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710848366f195838218f.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710848066f195801e469.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710850566f195999c414.png',
  'https://pledis.co.kr/resources/_data/file/bbsData/172710873566f1967fd380c.png',
];
// 더미데이터
const name = [
  '세븐틴',
  'S.COUPS',
  '정한',
  '조슈아',
  '준',
  '호시',
  '원우',
  'WOOZI',
  'THE 8',
  '민규',
  '도겸',
  '승관',
  'VERNON',
  '디노',
];

export default function Page() {
  const [data, setData] = useState<ArtistData | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 저장
  const [error, setError] = useState<string | null>(null);
  // const [artistName, setArtistName] = useState("세븐틴"); // artist 이름 저장

  const [currentIndex, setCurrentIndex] = useState(0); // 캐러셀 위치 상태 관리
  const [largeImageSrc, setLargeImageSrc] = useState(images[0]); // 큰 이미지 상태 관리
  const itemsPerView = 7; // 한 번에 보이는 이미지 수

  // 아티스트 이름 어떻게 가져오누?

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchArtistData();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

  const parseData = JSON.stringify(data, null, 2);
  console.log(parseData); // 파싱된 데이터 확인용

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      {/* 큰 이미지 */}
      <div className='p-4'>
        <Image
          src={largeImageSrc}
          alt='Large Image'
          width={1200}
          height={1600}
          className='w-96 h-96 rounded-lg shadow-lg'
        />
      </div>

      {/* 작은 이미지 캐러셀 */}
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
                {/* 캐러셀 이미지 호버 시 이벤트 */}
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
      <div className='text-black'>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
