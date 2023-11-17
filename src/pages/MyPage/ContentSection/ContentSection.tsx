import { Route, Routes } from 'react-router-dom';

import Bookmark from '../Bookmark/Bookmark';
import ChangePassword from '../ChangePassword/ChangePassword';
import EditProfile from '../EditProfile/EditProfile';
import Event from '../Event/Event';
import Like from '../Like/Like';
import Review from '../Review/Review';

import * as S from './ContentSectionStyle';

const ContentSection = () => {
  return (
    <S.ContentSection>
      <S.ContentWrapper>
        <Routes>
          <Route path="/" element={<Bookmark />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="like" element={<Like />} />
          <Route path="myreview" element={<Review />} />
          <Route path="myevent" element={<Event />} />
          <Route path="edit_profile" element={<EditProfile />} />
          <Route path="change_password" element={<ChangePassword />} />
        </Routes>
      </S.ContentWrapper>
    </S.ContentSection>
  );
};

export default ContentSection;
