import { apiSlice } from '../../app/api/apiSlice';

type ImageData = {
  filename: string;
};
export const imageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query({
      query: (fileName: string) => ({
        url: `/images/${fileName}`,
        providesTags: ['Images'],
      }),
    }),
    addImage: builder.mutation<ImageData, { imageFile: FormData }>({
      query: ({ imageFile }) => ({
        url: '/images',
        method: 'POST',
        headers: {},
        body: imageFile,
      }),
      invalidatesTags: ['Images'],
    }),
  }),
});

export const { useGetImageQuery, useAddImageMutation } = imageSlice;
