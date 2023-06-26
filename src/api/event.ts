import { getEventParams } from '../types/eventService';

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

export const reveiws = async () => {
  try {
    const res = await client.get('/reviews');
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const eventsApi = {
  get: async ({
    artistId,
    onlyInProgress,
    page,
    size,
    sort,
  }: getEventParams) => {
    try {
      const res = await client.get('/events', {
        params: {
          page: page,
          size: size,
          sort: sort,
          artistId: artistId,
          inProgress: onlyInProgress,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
};
