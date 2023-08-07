import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

import Rating from '../../components/Rating';
import SketchbookLayout from '../../components/SketchbookLayout';
import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';
import { useAddImageMutation } from '../../redux/imageSlice';
import { useAddReviewMutation } from '../../redux/reviewApiSlice';

import * as S from './EditReviewStyle';

const EditReview = () => {
  const [rating, setRating] = useState<number>(0);
  const [previews, setPreviews] = useState<string[]>([]);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);
  const [reqImages, setReqImages] = useState<File[]>([]);
  const [addNewImage] = useAddImageMutation();
  const [addReview] = useAddReviewMutation();
  const { routeTo } = useRouter();

  const { id } = useParams<{ id: string }>();
  const reviewText = useInput('');

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCurrentPreview(URL.createObjectURL(file));
      if (previews.length === 3) {
        previews.shift();
        setPreviews([...previews, URL.createObjectURL(file)]);
      } else {
        setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
      }
      if (reqImages.length === 3) {
        reqImages.shift();
        setReqImages([...reqImages, file]);
      } else {
        setReqImages((prev) => [...prev, file]);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && rating && reviewText.value && reqImages.length > 0) {
      try {
        const imageUrls = await Promise.all(
          Object.values(reqImages).map(async (image: File) => {
            const formData = new FormData();
            formData.append('file', image);
            const imagesResults = await addNewImage({
              imageFile: formData,
            });
            if ('data' in imagesResults) {
              return imagesResults.data.filename;
            }
          })
        );

        const reqData = {
          eventId: parseInt(id),
          score: rating,
          content: reviewText.value,
          imageFilenames: imageUrls as string[],
        };

        const reviewResult = await addReview(reqData);
        if ('data' in reviewResult) {
          routeTo(`/review/${reviewResult.data.id}`);
        }
      } catch (error) {}
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <SketchbookLayout onSubmit={handleSubmit}>
      <S.TopSection>
        <S.AddImageSection>
          <S.CurrentPreview currentImage={currentPreview} />
          <S.ImageInputLabel htmlFor="reviewImage">사진 추가</S.ImageInputLabel>
          <input
            style={{ display: 'none' }}
            id="reviewImage"
            name="reviewImage"
            type="file"
            accept="image/*"
            onChange={handleImagePreview}
          />
        </S.AddImageSection>
        <S.PreviewImageBox>
          <S.PreviewImageSection>
            {previews.map((preview, index) => (
              <S.SelectedImage key={index} selectedImage={preview} />
            ))}
          </S.PreviewImageSection>
          <S.ButtonWraaper>
            <S.SmallButton>평점 주기</S.SmallButton>
            <Rating initialRating={rating} onChange={handleRatingChange} />
          </S.ButtonWraaper>
        </S.PreviewImageBox>
      </S.TopSection>
      <S.TextSection onChange={reviewText.onChange} />
      <div>
        <S.SubmitButton>작성 완료</S.SubmitButton>
        <S.CancelButton>취소</S.CancelButton>
      </div>
    </SketchbookLayout>
  );
};

export default EditReview;
