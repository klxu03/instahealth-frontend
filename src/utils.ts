import delay from 'delay';
import ky from 'ky';
import { account, Account } from './state';

console.log(`Server URL: ${process.env.SERVER_URL!}`);

export const api = ky.extend({
  prefixUrl: process.env.SERVER_URL,
});

export async function fetchAccount(accountId: string) {
  const response = await api.get(`account/${accountId}`);
  const result = (await response.json()) as Account;
  await delay(500);

  account.id = result.id;
  account.role = result.role;
}
