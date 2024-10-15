/* eslint-disable @typescript-eslint/no-unused-expressions */
import { create } from 'zustand';

export type Imessage = {
  created_at: string;
  id: string;
  is_edit: boolean;
  send_by: string;
  text: string;
  users: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    email: string;
    id: string;
  } | null;
};

interface MessageState {
  messages: Imessage[];
  actionMessage: Imessage | undefined;
  optimisticIds: string[]; // 낙관적 업데이트로 추가된 메시지 ID를 추적하여 중복 구독 방지
  addMessage: (message: Imessage) => void;
  setActionMessage: (message: Imessage | undefined) => void;
  optimisticDeleteMessage: (messageId: string) => void;
  optimisticUpdateMessage: (message: Imessage) => void;

  // NOTE - 낙업데이트된 메시지 ID를 추적하여 중복 추가나 중복 업데이트를 방지
  setOptimisticIds: (id: string) => void;
  setMessages: (message: Imessage[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticIds: [],
  actionMessage: undefined,

  // NOTE - 페이지네이션 낙관적 메세지 업데이트
  setMessages: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
    })),

  // NOTE - 낙관적 업데이트된 메시지 ID를 추적하여 중복 추가나 중복 업데이트를 방지
  setOptimisticIds: (id: string) => set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
  addMessage: (newMessages) =>
    set((state) => ({
      messages: [...state.messages, newMessages],
    })),

  setActionMessage: (message) => set(() => ({ actionMessage: message })),
  // NOTE - 메시지 삭제(낙관적 메세지 삭제)
  optimisticDeleteMessage: (messageId) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => message.id !== messageId),
      };
    }),

  // NOTE - 메시지 업데이트(낙관적 메세지 업데이트)
  optimisticUpdateMessage: (updateMessage) =>
    set((state) => {
      return {
        messages: state.messages.filter((message) => {
          if (message.id === updateMessage.id) {
            (message.text = updateMessage.text), (message.is_edit = updateMessage.is_edit);
          }
          return message;
        }),
      };
    }),
}));
