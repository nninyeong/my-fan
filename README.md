# 🍚 3조 밥조 - Project [My Fan]

## 🔎 목차 <br>

🔗 - [1. 프로젝트 소개](#-프로젝트-및-팀-소개) <br>
🔗 - [2. STACKS](#-stacks) <br>
🔗 - [3. 와이어 프레임](#-와이어-프레임) <br>
🔗 - [4. 기능](#-기능) <br>
🔗 - [5. CODE](#-code) <br>
🔗 - [6. 트러블슈팅](#-트러블슈팅) <br>
🔗 - [7. 회고](#-회고) <br>
🔗 - [8. 폴더구조](#-폴더구조) <br>

## 💡[프로젝트 소개](#-목차)

- 프로젝트 명 : My Fan
- 프로젝트 소개 : 좋아하는 아티스트의 커뮤니티를 생성/탐색하여 같은 주제로 이야기를 나누거나,아티스트의 일정을 공유하는 등의 활동을 할 수 있는 웹 사이트
- 배포 링크 : https://my-fan.vercel.app/
- github 링크 : https://github.com/nninyeong/my-fan.git
- 개발 기간
  | 구분 | 기간 | 활동 | 비고 |
  | ------- | ------ | ----------------------------- | --------------------------------------- |
  | 사전 기획 | 10/10(목)~10/10(목) | 프로젝트 기획 및 주제 선정, 기획안 작성, 와이어 프레임 작성 | 아이디어선정 |
  | API 확인 | 10/11(금)~10/11(금) | 스포티파이 API, 매니아db API 내용확인 | |
  | 개발 | 10/11(금)~10/16(수) | 개발 진행 | |
  | 데이터 수집 | 10/16(수)~10/16(수) | 필요 데이터 및 수집 절차 정의, 외부 데이터 수집 | |
  | 서비스 배포 | 10/16(수)~10/16(수) | 서비스 병합 및 배포 | 최적화 및 오류 수정 |
  | 총 개발기간 | 10/10(목)~10/17(목) 총 1주 |
  ||
  <br>

- 팀 소개
  <br>

  | 이름   | 역할 | 담당                                                       | github                                       |
  | ------ | ---- | ---------------------------------------------------------- | -------------------------------------------- |
  | 김민영 | 리더 | 아티스트 일정 캘린더 구현                                  | [@nninyeong](https://github.com/nninyeong)   |
  | 류지원 | 팀원 | 좋아하는 아티스트 서치 화면 구현                           | [@dev-rjw](https://github.com/dev-rjw)       |
  | 이예람 | 팀원 | 아티스트 정보 캐러셀                                       | [@leeyeram84](https://github.com/leeyeram84) |
  | 정희록 | 팀원 | 자유게시판 화면 및 댓글                                    | [@heerokj](https://github.com/heerokj)       |
  | 최유나 | 팀원 | 회원가입/ 로그인/ 로그아웃, 마이페이지, 채팅페이지화면구현 | [@yuna-c](https://github.com/yuna-c)         |
  |        |

## 📝 [STACKS](#-목차)

### Environment

<img src="https://cdn.discordapp.com/attachments/1244516648866680885/1296270234738622514/028d05365b74dcd5.jpg?ex=6711ad3b&is=67105bbb&hm=3440899fcb9d993226acee8859bb5d9b1302e92296721d0d1c22bb50a6bc25bc&" width="75"  />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270246180818994/0ffc8c39ad4929ba.jpg?ex=6711ad3e&is=67105bbe&hm=d3444ef8c7b90c64c07218c5b1f4c347ee47bc4ebf4af6931ae0bda4e47a6d1e&=&format=webp&width=1600&height=430" width="75"  /> <br>

### Development

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270236089188362/c88e68fe854b5c70.jpg?ex=6711ad3b&is=67105bbb&hm=37d55623749ceef36b658688ed93ea8cb31680342dec2c4842836b2af7227890&=&format=webp&width=1600&height=430" width="75"  /> <br>

### Framework

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270246507843624/2eac7234ece1c139.jpg?ex=6711ad3e&is=67105bbe&hm=aa31d6b5ef9d223f8a6ae0cdde9ca56bfa921a348c2ed06de4c17e66646e4380&=&format=webp&width=1600&height=430" width="75"  /> <br>

### Library

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270235422294026/f1962a453d61508e.jpg?ex=6711ad3b&is=67105bbb&hm=7f6ffdd7abdf465fcf1c8cadcec3fbd958c414d073ace0a8372866d5abf9e1f4&=&format=webp&width=1600&height=430" width="75"  />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270235615100988/f1079bbcb87b2fcc.jpg?ex=6711ad3b&is=67105bbb&hm=b6d10aafff742ea906c1f25966645b7be87c0794aa85fc36ca5ede070870e54f&=&format=webp&width=1600&height=430" width="75"  />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270235875151873/b1cc7126dd034d43.jpg?ex=6711ad3b&is=67105bbb&hm=7181d0fbbcd75f95b0ab5f94010ad40b08607953eb53963bf667268686c27374&=&format=webp&width=1600&height=430" width="75"  />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270236500234260/cb73f3ae988acdb2.jpg?ex=6711ad3b&is=67105bbb&hm=2757466f365cd69cf85d74bc632dfd31ee77d7ac1db2ec8697bcb70c72991483&=&format=webp&width=1600&height=430" width="75"  />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270247070007436/475d2a0a4bea8fd3.jpg?ex=6711ad3e&is=67105bbe&hm=217c40b2c864710f2e3508743b1004ab0088e37fd8798e9f06eb788221251240&=&format=webp&width=1600&height=430" width="75" />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270246797246579/b53048ab6abd874d.jpg?ex=6711ad3e&is=67105bbe&hm=dd829b2b26ea4caa9c01f0507b2a8602f2195fc7196dc4e59432e80059211c84&=&format=webp&width=1600&height=430" width="75" />

### Database

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270235208515635/4e45dde4137ddef3.jpg?ex=6711ad3b&is=67105bbb&hm=bba522d73c99cd1d0ba2c354bdc096369267b2603d44fe31318edd8266aba2b2&=&format=webp&width=1600&height=430" width="75"  /><br>

### Design

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270234994479104/31086fea9feb092c.jpg?ex=6711ad3b&is=67105bbb&hm=4c55788a6385a048effd2b0303d8da8be33709c2aa96da2280f6630380e03538&=&format=webp&width=1600&height=430" width="75" />
<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270236898824243/f7f7f25c3aa3d108.jpg?ex=6711ad3c&is=67105bbc&hm=2e797fc445cdcea3f0ca93d19a4fa72c9c796d90bcf80af83170629ccf13e44e&=&format=webp&width=1600&height=430" width="75" />
<br>

### Deployment

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296270237175517214/148c03fe0250153f.jpg?ex=6711ad3c&is=67105bbc&hm=31342724b0c6c374a103a3f0d14b44069eb9651dcec57fb7233b21de3991f8a0&=&format=webp&width=1600&height=430" width="75" />

## 🖥 [와이어 프레임](#-목차)

|                                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296300212750647369/image.png?ex=6711c926&is=671077a6&hm=d73ed9fb2f5656fadbc6e41a9d26751cb4091e9e1de9e3b644335aea22852af0&=&format=webp&quality=lossless&width=2160&height=1038" width="250"> | <img src="https://media.discordapp.net/attachments/1244516648866680885/1296300213178470481/image.png?ex=6711c926&is=671077a6&hm=b0ed5e7784f04c98ef2a4feddf37dd222ddfbb7bfa765a48d1b4f01984229c93&=&format=webp&quality=lossless&width=2160&height=1038" width="250"> |
| <center>로그인 페이지                                                                                                                                                                                                                                                | <center>로그아웃 페이지                                                                                                                                                                                                                                              |
| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296306590546268272/image.png?ex=6711cf17&is=67107d97&hm=3f6ddc1e797e65beff20563144911144e939e3674824b08f06509a110d753d2f&=&format=webp&quality=lossless&width=2160&height=1042" width="250"> | <img src="https://media.discordapp.net/attachments/1244516648866680885/1296300211093766195/image.png?ex=6711c926&is=671077a6&hm=14bdd415e99d8667a218532d369476f8f01318a7acea3964fae65f6ba4d7b7c7&=&format=webp&quality=lossless&width=2160&height=1038" width="250"> |
| <center>메인 검색 페이지                                                                                                                                                                                                                                             | <center>아티스트 페이지                                                                                                                                                                                                                                              |
| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296300211626315866/image.png?ex=6711c926&is=671077a6&hm=ce1e17f01b7e33d923a3e1493862a482b4eab4aaecb35ab950f8dd6543e44fcc&=&format=webp&quality=lossless&width=2160&height=1038" width="250"> | <img src="https://media.discordapp.net/attachments/1244516648866680885/1296306960257519726/image.png?ex=6711cf6f&is=67107def&hm=2ab3f04cb7f02440f733b5e72d41291203a44659e51a6a707c8d9baf1dd82b7a&=&format=webp&quality=lossless&width=2160&height=1042" width="250"> |
| <center>스케쥴 페이지                                                                                                                                                                                                                                                | <center>자유게시판 페이지                                                                                                                                                                                                                                            |
| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296300212394004611/image.png?ex=6711c926&is=671077a6&hm=e4a9498ee052d5054eea25b367788e1b309226d01ba5f28d466ba0a6ec784df3&=&format=webp&quality=lossless&width=2160&height=1038" width="250"> | <img src="https://media.discordapp.net/attachments/1244516648866680885/1296300212058456105/image.png?ex=6711c926&is=671077a6&hm=513eb6210d19d166d901eb45cfa587291093165f5fd44952a060cd3cb792e93f&=&format=webp&quality=lossless&width=2160&height=1038" width="250"> |
| <center>채팅 페이지                                                                                                                                                                                                                                                  | <center>마이 페이지                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                      |

## 💻 [기능](#-목차)

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296319663483125811/2024-10-1712.17.40-ezgif.com-video-to-gif-converter_1.gif?ex=6711db44&is=671089c4&hm=dcc268f340e5c57b05c245247f8a57612d32fe91f6815ff2526fc4c1f781b148&=&width=1200&height=578" width="550"> |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <center>회원가입 및 로그인                                                                                                                                                                                                                                                             |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296320318541004801/2024-10-1712.13.20-ezgif.com-video-to-gif-converter_1.gif?ex=6711dbe0&is=67108a60&hm=e0fa62ba3efca461604bf8af6d7b11c35b6c75bd68fe2a7cccee9e25cb728b11&=&width=1200&height=578" width="550"> |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <center>메인 페이지 아티스트 검색 및 아티스트 페이지 이동                                                                                                                                                                                                                              |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296314798291681293/2024-10-1712.14.34-ezgif.com-video-to-gif-converter.gif?ex=671673fc&is=6715227c&hm=6ed1209b17b82e0982a69a26aedc3727d8fd92b1434bea21a202282f015df146&=&width=1200&height=578" width="550"> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <center>아티스트 페이지 캐러셀 이동 및 아티스트 선택                                                                                                                                                                                                                                 |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296320798474240051/2024-10-1712.26.25-ezgif.com-video-to-gif-converter.gif?ex=6711dc52&is=67108ad2&hm=c75e2372b60693ad41fa7c519f04fd1eebdc61e831bd489b9863d8c7518dc42c&=&width=1200&height=578" width="550"> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <center>자유 게시판 이동 및 CRUD                                                                                                                                                                                                                                                     |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296314800195895346/2024-10-1712.27.24-ezgif.com-video-to-gif-converter.gif?ex=6711d6bc&is=6710853c&hm=28332cddc5c3c118b8b6ed945201815f2a2148ad89cd21458975693cdcf2e29f&=&width=1200&height=578" weidth="550"> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <center>자유 게시판 댓글 CRUD                                                                                                                                                                                                                                                         |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296319016171868251/2024-10-1712.40.11-ezgif.com-video-to-gif-converter.gif?ex=6711daa9&is=67108929&hm=99c015c1e9694302a52d302fd73a46f275ff2ab0b1785ed31d8f1fa16638517b&=&width=1200&height=578" width="550"> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <center>스케쥴 게시판 CRUD                                                                                                                                                                                                                                                           |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296314799323615302/2024-10-1712.20.28-ezgif.com-video-to-gif-converter.gif?ex=6711d6bc&is=6710853c&hm=7fbb8d5b405d45ff25f0d83ac4857da2390dcaab1ff43b1f3a6b0b1b65579367&=&width=1200&height=578" width="550"> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <center>실시간 유저 채팅                                                                                                                                                                                                                                                             |

| <img src="https://media.discordapp.net/attachments/1244516648866680885/1296314799839383624/2024-10-1712.24.30-ezgif.com-video-to-gif-converter.gif?ex=6711d6bc&is=6710853c&hm=86a5c2eeab72a79cf1c3ec46eeb865be22870959a400ee698dc4ab08fe5e48ef&=&width=1200&height=578" width="550"> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <center>마이페이지 이동 및 프로필 수정                                                                                                                                                                                                                                               |

## 💣 [트러블슈팅](#-목차)

<details>
<summary>1. 쿼리 파람스를 제대로 가져오지 못하는 문제</summary>

```tsx
const url = new URL(req.url);
const name = url.searchParams.get('name');
```

</details>

<details>

<summary>2. Cannot read properties of null 문제</summary>

```tsx
 Unhandled Runtime Error TypeError: Cannot read properties of null (reading 'default')
null 객체에서 default 속성을 읽으려고 할 때 발생하는 문제로, 주로 next/image 컴포넌트에서 이미지 속성(props)을 처리할 때 발생하는데 src 속성에 전달되는 이미지 경로 또는 관련 변수가 null이거나 타입이 바르게 설정되지 않았기 때문에 발생하는 에러이다

<Image
src={message.users?.avatar_url!}
alt={message.users?.display_name || username ||'' }
 width={40}
height={40}
className='rounded-full ring-2'
/>
src={message.users?.avatar_url!} 부분에서 avatar_url이 null이거나 undefined일 때, Next.js의 next/image 컴포넌트는 src 속성이 필수적이므로 오류가 발생하여... 하루종일 찾다가 하나하나 찾아보고 발견했다.
특히 !연산자는 ts에서 null이나 undefined가 없다고 강제하는 연산자이지만, 실제로 값이 null이면 런타임에서 문제가 발생할 수 있었는데 찾는데 하루종일 걸렸다. 이것 때문에 로그인 후 채팅 페이지 안 열림
```

</details>

<details>
<summary>3. 채팅 기능에서 username이 나오지 않는 문제</summary>

```tsx
채팅 기능을 만들면서 메시지를 상태에 추가할 때, username이 나오지 않는 문제가 발생하였다.. 소셜로그인을 먼저 진행한 후 회원가입 페이지를 만들어 생긴 이슈. 메시지를 전송할 때, 사용자 정보가 바르게 상태에 반영되지 않아 사용자 이름이 누락되는 상황이 발생하였는데
스프레드 오퍼레이터를 사용하여, user 객체의 **메타데이터(user_metadata)**를 메시지에 추가했다.  즉, 사용자 객체의 모든 정보를 메시지에 포함 시켜, 누락된 사용자 이름이 올바르게 상태에 반영하는 것이다. 찾기 어려웠던 이유는 아마 낙관적 업데이트를 먼저 진행하면서 수정을 한 상태여서 찾기가 더욱 용이하지 않았던 것 같다.

이번에 낙관적 업데이트를 처음으로 써 보았는데 클라이언트 측에서 데이터를 업데이트 한 후 서버에 보내는 방식이어서 그런지 서버 응답이 실패 했을 때 데이터가 일치하지 않으면 찾아내기 더욱 힘들었다.
```

</details>

<details>
<summary>4. useParams를 이용해 한글인 [id]를 가져오면 글씨가 깨지는 문제</summary>

```tsx
자바스크립트 디코딩 함수인 decodeURIComponent()를 이용하여 별도 처리
const { id } = useParams();

  // id가 문자열일 때만 decodeURIComponent를 호출
  const urlId = Array.isArray(id) ? id[0] : id ? decodeURIComponent(id) : '';
```

</details>

<details>
<summary>5. 캐러셀 이동 시 이미지가 화면에 넘치는 문제</summary>

```tsx
캐러셀에 나타낼 이미지 수를 담는 변수와 불러온 이미지 수의 값을 계산해 min과 max를 계산하고 이를 handlePrev,handleNext 함수를 사용해 이미지 제어

const itemsPerView = 7; // 한 번에 보이는 이미지 수

// 캐러셀 이동 및 마지막 이미지에서 멈춤
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - itemsPerView));
  };

  // 클릭한 캐러셀 이미지로 큰 이미지 변경하는 함수
  const handleImageClick = (index: number) => {
    setLargeImageSrc(images[index]); // 클릭한 이미지로 큰 이미지 변경
  };
```

</details>

## 📌 [회고](#목차)

<details>
<summary>김민영</summary>

- 프로젝트 결과물에 대한 완성도 평가
  (8점) 전체적으로 필요한 기능들을 잘 구현했지만 예외상황에대한 대응이 조금 부족했던 것 같다
- 잘 한 부분과 아쉬운 점
  (잘 한 부분) 일정관리를 유동적으로 잘 했다
  (아쉬운 부분) 더 적극적으로 일을 나눠서 계획한 내용을 모두 완수할 수 있었으면 좋았을 것 같다!
- 느낀점
  next를 이용한 첫 팀 프로젝트였다. 개인 프로젝트때보다 이해도가 올라간 것 같지만 사용하는 도구를 얼마나 이해하고 활용하는 건지 중요하다고 생각이 들었다. 타입스크립트와 next.js를 더 공부해서 잘 활용하고 싶다!
- 개선해야 할 점
프로젝트에 반응형 ui를 적용하고 예외처리를 좀 더 추가하고 싶다!
</details>

<details>
<summary>류지원</summary>

- 프로젝트 결과물에 대한 완성도 평가
  (8점) 실력이 부족하여 많이 참여를 하지 못한 것 같다
- 잘 한 부분과 아쉬운 점
  (잘 한 부분) 일단 내가 맡은 메인 화면은 완성시킨 점 <br>
  (아쉬운 부분) 원래 맡았던 로그인/회원가입을 완성시키지 못한 점
- 느낀점
  Next.js와 TypeScript에 진 것 같은 느낌이 든다... 다음에는 이겨야헸다
- 개선해야 할 점
음악 API를 더 신중하게 고르거나 DB를 더 빵빵하게 채웠어야 했을 것 같다
</details>

<details>
<summary>이예람</summary>

- 프로젝트 결과물에 대한 완성도 평가
  (7점) 처음 기획했던 구현 기능 중 일부를 구현하지 못했다
- 잘 한 부분과 아쉬운 점
  (잘 한 부분) 캐러셀을 라이브러리를 사용하지 않고 구현<br>
  (아쉬운 부분) 개인적으로 컨디션이 좋지 않아 제대로 집중하지 못해 처음 맡은 기능을 모두 구현하지 못한 점
- 느낀점
  컨디션 관리가 중요하다는걸 깨달았다. 잦은 컨디션 난조로 제대로 집중을 하지 못해 팀원들에게 민폐를 끼친것같아 죄송하다
- 개선해야 할 점
컴포넌트 분리
</details>

<details>
<summary>정희록</summary>

- 프로젝트 결과물에 대한 완성도 평가
  (7점) 실력이 부족한 거 같아서 최적화 등에 신경 쓸 겨를 없이 기능 구현하기에 급급한 것 같다
- 잘 한 부분과 아쉬운 점
  (잘 한 부분) 하고 싶었던 기능을 해볼 수 있어서 좋았다<br>
  (아쉬운 부분) 도전 기능을 구현하지 못해서 아쉽다
- 느낀점
  부족한 점이 많이 보였고 취업 전 새로운 기능을 넣어서 구현해보고 싶다 끝까지 열심히 해주신 팀원들 감사합니당
- 개선해야 할 점
내 코드를 클린하게 작성하고 싶고 컴포넌트 분리 및 텐스텍 쿼리 활용하여 개선해보고 싶다
</details>

<details>
<summary>최유나</summary>

- 프로젝트 결과물에 대한 완성도 평가
  (3점) 실력이 부족하여 많이 참여를 못하고 만들고 보니 이상한 로직이 한둘이 아니다.
- 잘 한 부분과 아쉬운 점
  (잘 한 부분) 다들 잘하던 못하던 독려해주시는 모습이 보기 좋았다 <br>
  (아쉬운 부분) 조금 더 일찍 시작(내가) 했더라면 완성도가 높지 않았을까 하는 아쉬움
- 느낀점
  역시 멀었다
- 개선해야 할 점
전체적으로 내용이 많이 없어서 API를 가져와 뿌려주는 작업부터 다시 시작해야 할 것 같고 미들웨어에서 세션을 받아오는 것 부터 인증인가부터 다시 시작해야 할 것 같다
</details>

## 📝 [폴더구조](#-목차)

<img src="https://media.discordapp.net/attachments/1244516648866680885/1296297014044393503/image.png?ex=6711c62c&is=671074ac&hm=83e3ce76767d4173237e567d47e4cd304363d64bbf884051e53b3d45c7b34775&=&format=webp&quality=lossless&width=1000&height=1064" width = 500>
