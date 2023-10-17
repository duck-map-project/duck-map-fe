import { TwitterTweetEmbed } from 'react-twitter-embed';
import { styled } from 'styled-components';

const TwitterEmbedSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 25px;
  background-color: #fcfefe;
  border-radius: 20px;
  border: 2px dashed #1e232c33;
`;

interface TwitterInfoSectionProps {
  twitterUrl: string;
}

const TwitterInfoSection = ({ twitterUrl }: TwitterInfoSectionProps) => {
  const getTweetIdFromUrl = (url: string) => {
    const regex = /status\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const twittId = getTweetIdFromUrl(twitterUrl);

  return (
    <TwitterEmbedSection>
      {twittId ? (
        <TwitterTweetEmbed tweetId={twittId} />
      ) : (
        <div>앗, 불러오지 못했어요. 트위터 주소를 확인해주세요.</div>
      )}
    </TwitterEmbedSection>
  );
};

export default TwitterInfoSection;
