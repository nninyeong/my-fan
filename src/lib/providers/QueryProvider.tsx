'use client';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 기본 staleTime을 0 이상으로 설정하여
        // 클라이언트에서 즉시 refetch하지 않도록 합니다.
        staleTime: 60 * 1000, // 1분
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 query client를 만듭니다.
    return makeQueryClient();
  } else {
    // 브라우저: 이미 query client가 없다면 새로 만듭니다.
    // 이는 React가 초기 렌더링 중에 suspend할 경우 새로운 클라이언트를 다시
    // 만들지 않도록 하기 위함입니다. 만약 suspense boundary가 이 코드 아래에 있다면
    // 이 작업은 필요 없을 수 있습니다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Provider({ children }: { children: React.ReactNode }) {
  // NOTE: Query client를 초기화할 때 suspense boundary가 없다면
  //       useState 사용을 피해야 합니다. 렌더링 중 React가 suspend하고
  //       boundary가 없을 경우 클라이언트를 버릴 수 있기 때문입니다.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
