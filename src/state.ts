import { ref, reactive } from 'vue';

export type Account = {
  id: number;
  role: string;
};

export type Answer = {
  id: number;
  content: string;
  role: string;
  authorName: string;
};

export type Question = {
  id: number;
  question: string;
  content: string;
  role: string;
  answers: Answer[];
};

export const account = reactive<Account>({} as Account);

export const isLoggedIn = ref<boolean | null>(null);

export const questions = reactive<Question[]>([]);
