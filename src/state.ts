import { ref, reactive } from 'vue';

export type Account = {
  id: number;
  name: string;
  role: string;
};

export const account = reactive<Account>({} as Account);

export const isLoggedIn = ref<boolean | null>(null);
