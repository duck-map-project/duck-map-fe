import ReviewItem from '../../components/ReviewItem';
import { useAuthContext } from '../../contexts/AuthContext';

import feedData from './feedData.json';

interface useAuthContext {
  withAuth: boolean;
}

const MyReview = () => {
  const auth = useAuthContext();

  return (
    <>
      {feedData.map((feed, key) => (
        <ReviewItem
          key={key}
          profileImage={
            auth?.user.profileImage ||
            'http://localhost:3000/static/media/logo-icon.b8fcaafc839de274869b.png'
          }
          score={feed.score}
          reviewDate={feed.reviewDate}
          ReviewContents={feed.ReviewContents}
          reviewPhoto={feed.reviewPhoto}
          userName={''}
          withAuth={false}
        />
      ))}
    </>
  );
};

export default MyReview;
