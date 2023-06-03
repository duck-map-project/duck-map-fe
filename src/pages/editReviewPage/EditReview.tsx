import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';

import AddImageButton from '../../components/AddImageButton';
import Button from '../../components/Button';
import Rating from '../../components/Rating';

import {
  ImgInput,
  PageWrapper,
  PreviewImg,
  TextArea,
  TopSection,
} from './EditReviewStyle';

const ButtonWithMargin = styled(Button)`
  margin-right: 11px;
`;

const EditReview = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImgFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <PageWrapper>
      <TopSection>
        <PreviewImg url={previewImage as string}>
          <AddImageButton size="big" htmlFor="img-input" />
          <ImgInput
            id="img-input"
            type="file"
            accept="image/*"
            onChange={handleImgFileChange}
          />
        </PreviewImg>
        <Rating />
        <div>
          <ButtonWithMargin color="primary" size="mid">
            작성 완료
          </ButtonWithMargin>
          <Button color="white" size="mid">
            취소
          </Button>
        </div>
      </TopSection>
      <TextArea />
    </PageWrapper>
  );
};

export default EditReview;
