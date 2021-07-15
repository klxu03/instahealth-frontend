import { ref, reactive } from 'vue';

export type Account = {
  id: number;
  role: string;
};

export type Question = {
  id: number;
  question: string;
  content: string;
  role: string;
};

export type Answer = {
  id: number;
  content: string;
  role: string;
  authorName: string;
};

export const account = reactive<Account>({} as Account);

export const isLoggedIn = ref<boolean | null>(null);

export const questions = reactive([
  {
    id: 1,
    question: 'Mild occasional lightheadedness',
    content: 'I have mild occasional lightheadedness',
    role: 'patient',
  },
  {
    id: 2,
    question: 'Severe weight loss',
    content: 'I have severe weight loss',
    role: 'patient',
  },
  {
    id: 3,
    question: 'Mild ringing in the ears',
    content: 'I have mild ringing in the ears',
    role: 'patient',
  },
  {
    id: 4,
    question: 'Critical shortness of breath',
    content: 'I have critical shortness of breath',
    role: 'patient',
  },
]);
