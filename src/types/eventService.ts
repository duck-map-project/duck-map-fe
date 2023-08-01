export interface getEventParams {
  artistId: number;
  onlyInProgress: boolean;
  page: number;
  size: number;
  sort: ('empty' | 'unsorted' | 'sorted')[];
}

interface ArtistType {
  id: number;
  type: string;
}

interface Artist {
  id: number;
  groupId: number;
  groupName: string;
  name: string;
  image: string;
  artistType: ArtistType;
}

interface Category {
  id: number;
  category: string;
}

export interface EventData {
  id: number;
  storeName: string;
  inProgress: boolean;
  fromDate: string;
  toDate: string;
  address: string;
  businessHour: string;
  hashtag: string;
  twitterUrl: string;
  artists: Artist[];
  categories: Category[];
  images: string[];
  score: number;
  likeId: number;
  likeCount: number;
  bookmarkId: number;
}
