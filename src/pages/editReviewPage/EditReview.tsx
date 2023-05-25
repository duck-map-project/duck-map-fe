import { styled } from 'styled-components';

import addImageIcon from '../../assets/icon-add-image.svg';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
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
  return (
    <PageWrapper>
      <TopSection>
        {/* TODO: 임이의 url 삭제 */}
        <PreviewImg url="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80">
          <IconButton image={addImageIcon} htmlFor="img-input" />
          <ImgInput id="img-input" type="file" accept="image/*" />
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
