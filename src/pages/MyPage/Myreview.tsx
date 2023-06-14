import ReviewItem from '../../components/ReviewItem';

import feedData from './feedData.json';

const MyReview = () => {
  return (
    <>
      {feedData.map((feed, key) => (
        <ReviewItem
          key={key}
          profileImage={feed.profileImage}
          score={feed.score}
          reviewDate={feed.reviewDate}
          ReviewContents={feed.ReviewContents}
          reviewPhoto={feed.reviewPhoto}
          userName={''}
        />
      ))}
    </>
  );
};

export default MyReview;
