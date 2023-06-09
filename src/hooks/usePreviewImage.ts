import { ChangeEvent, useState } from 'react';

interface PreviewImageHookResult {
  previewImage: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const usePreviewImage = (
  initialValue: string | null
): PreviewImageHookResult => {
  const [previewImage, setPreviewImage] = useState<string | null>(initialValue);

  const handleImgFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = (e) => {
          setPreviewImage(e.target?.result as string);
        };

        reader.onerror = (error) => {
          console.error('Error occurred while reading the file:', error);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error occurred while reading the file:', error);
      }
    }
  };

  return { previewImage, onChange: handleImgFileChange };
};

export default usePreviewImage;
