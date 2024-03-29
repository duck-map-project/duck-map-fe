import imageCompression from 'browser-image-compression';

import { useAddImageMutation } from '../features/images/imageApiSlice';

interface processImageProps {
  newImage: File | undefined;
  savedImage: string | undefined;
}

const useImageProcessing = (): {
  ImageProcessing: (props: processImageProps) => Promise<string | undefined>;
} => {
  const [addNewImage] = useAddImageMutation();

  const compressAndUploadImage = async (
    image: File
  ): Promise<string | undefined> => {
    let filename: string | undefined;

    try {
      const compressedImage = await imageCompression(image, {
        maxSizeMB: 0.2,
        maxIteration: 30,
      });

      const formData = new FormData();
      formData.append('file', compressedImage);

      const response = await addNewImage({
        imageFile: formData,
      });

      if ('error' in response) {
        alert('잠시 후 다시 시도해주세요.');
        return;
      }
      filename = response.data.filename;
    } catch (error) {
      console.error(error);
    }

    return filename;
  };

  const ImageProcessing = async ({
    newImage,
    savedImage,
  }: processImageProps) => {
    if (newImage) {
      const uploadImage = await compressAndUploadImage(newImage);
      return uploadImage;
    } else if (savedImage) {
      return savedImage;
    }
  };

  return { ImageProcessing };
};

export default useImageProcessing;
