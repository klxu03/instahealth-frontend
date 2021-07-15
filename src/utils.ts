import ky from 'ky';

console.log(`Server URL: ${process.env.SERVER_URL!}`);

export const api = ky.extend({
  prefixUrl: process.env.SERVER_URL,
});
