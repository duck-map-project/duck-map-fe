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
  {feedData.map((router) => {
    if (!auth?.isLogin && router.withAuth) {
    {feedData.map((feed, key) => (
      <ReviewItem
        key={key}
        profileImage={feed.profileImage}
        score={feed.score}
        reviewDate={feed.reviewDate}
        ReviewContents={feed.ReviewContents}
        reviewPhoto={feed.reviewPhoto}
        userName={''} withAuth={false}/>))
    }}})}
  </>
);
};

export default MyReview;
