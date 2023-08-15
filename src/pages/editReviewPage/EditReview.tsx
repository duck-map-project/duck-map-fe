import imageCompression from 'browser-image-compression';
import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../../components/Loading';
import Rating from '../../components/Rating';
import SketchbookLayout from '../../components/SketchbookLayout';
import useInput from '../../hooks/useInput';
import { useRouter } from '../../hooks/useRouter';
import { useAddImageMutation } from '../../redux/imageSlice';
import {
  useAddReviewMutation,
  useEditReviewMutation,
  useGetReviewByIdQuery,
} from '../../redux/reviewApiSlice';

import * as S from './EditReviewStyle';

interface EditReviewProps {
  type?: 'add' | 'modify';
}

const EditReview = ({ type = 'add' }: EditReviewProps) => {
  const [rating, setRating] = useState<number>(0);
  const [previews, setPreviews] = useState<string[]>([]);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);
  const [reqImages, setReqImages] = useState<File[]>([]);
  const [addNewImage] = useAddImageMutation();
  const [addReview] = useAddReviewMutation();
  const [editReview] = useEditReviewMutation();
  const { routeTo } = useRouter();
  const [isCompression, setIsCompression] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [currentId, setCurrentId] = useState<string>('');
  const reviewText = useInput('');
  const [skip, setSkip] = useState<boolean>(true);
  const { data: reviewData, refetch } = useGetReviewByIdQuery(currentId, {
    skip,
  });
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (id) {
      setCurrentId(id);
    }
  }, [id]);

  useEffect(() => {
    if (type === 'modify') {
      setSkip(false);
    }
  }, [type]);

  useEffect(() => {
    if (reviewData) {
      const processedPhotos = reviewData.photos.map((photo) => baseUrl + photo);
      setRating(reviewData.score);
      setPreviews(processedPhotos);
      reviewText.setValue(reviewData.content);
    }
  }, [reviewData]);

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

  const compressImages = async (images: File[]): Promise<File[]> => {
    const compressionImages = await Promise.all(
      images.map(async (image: File) => {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 438,
          };
          setIsCompression(true);
          const compressionResult = await imageCompression(image, options);
          return compressionResult;
        } catch (error) {
          console.error(error);
          setIsCompression(false);
          alert('이미지 압축 실패!');
          return;
        }
      })
    );

    return compressionImages.filter((image) => image !== undefined) as File[];
  };

  const uploadNewImage = async (images: File[]): Promise<string[]> => {
    const imageUrls = await Promise.all(
      images.map(async (image: File) => {
        try {
          const formData = new FormData();
          formData.append('file', image);
          const uploadResult = await addNewImage({
            imageFile: formData,
          }).unwrap();
          return uploadResult.filename;
        } catch (error) {
          console.error(error);
          alert('이미지 업로드 실패!');
          return;
        }
      })
    );

    return imageUrls.filter((image) => image !== undefined) as string[];
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      type === 'add' &&
      id &&
      rating &&
      reviewText.value &&
      reqImages.length > 0
    ) {
      try {
        const compressionResult = await compressImages(reqImages);
        const imageUrls = await uploadNewImage(compressionResult);

        const reqData = {
          eventId: parseInt(id),
          score: rating,
          content: reviewText.value,
          imageFilenames: imageUrls,
        };

        try {
          setIsCompression(false);
          const reviewResult = await addReview(reqData);
          if ('data' in reviewResult) {
            routeTo(`/review/${reviewResult.data.id}`);
          }
        } catch (reviewError) {
          console.error('리뷰 추가 오류:', reviewError);
        }
      } catch (error) {
        console.error('전체 처리 오류:', error);
      }
    } else if (
      type === 'modify' &&
      currentId &&
      rating &&
      reviewText.value &&
      (reqImages.length > 0 || previews.length > 0)
    ) {
      try {
        let imageUrls;
        if (reqImages.length !== 0) {
          const compressionResult = await compressImages(reqImages);
          imageUrls = await uploadNewImage(compressionResult);
        }

        const processedPhoto =
          reviewData &&
          reviewData.photos.map((photo) => photo.replace('/images/', ''));

        const reqData = {
          score: rating,
          content: reviewText.value,
          imageFilenames:
            reqImages.length !== 0 && imageUrls
              ? imageUrls
              : (processedPhoto as string[]),
        };

        try {
          setIsCompression(false);
          await editReview({ id: currentId, requestData: reqData }).unwrap();
          await refetch();
          routeTo(`/review/${currentId}`);
        } catch (reviewError) {
          console.error('리뷰 추가 오류:', reviewError);
        }
      } catch (error) {
        console.error('전체 처리 오류:', error);
      }
    }
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <SketchbookLayout flex="col" onSubmit={handleSubmit}>
      {isCompression && (
        <Loading text="리뷰를 업로드 중입니다. 잠시만 기다려주세요." />
      )}
      <S.TopSection>
        <S.AddImageSection>
          <S.CurrentPreview $currentImage={currentPreview} />
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
              <S.SelectedImage key={index} $selectedImage={preview} />
            ))}
          </S.PreviewImageSection>
          <S.ButtonWraaper>
            <S.SmallButton>평점 주기</S.SmallButton>
            <Rating initialRating={rating} onChange={handleRatingChange} />
          </S.ButtonWraaper>
        </S.PreviewImageBox>
      </S.TopSection>
      <S.TextSection onChange={reviewText.onChange} value={reviewText.value} />
      <div>
        <S.SubmitButton>작성 완료</S.SubmitButton>
        <S.CancelButton>취소</S.CancelButton>
      </div>
    </SketchbookLayout>
  );
};

export default EditReview;
