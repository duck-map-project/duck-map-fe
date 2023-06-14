import client from './client';

export const todayHashtags = async () => {
  try {
    const res = await client.get('/events/hashtags/today');
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};
