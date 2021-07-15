import ky from 'ky';

export const api = ky.extend({
  prefixUrl: process.env.SERVER_URL,
});
