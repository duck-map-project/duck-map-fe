export type reviewType = {
  id: number;
  inProgress: boolean;
  image: string;
  artists: string[];
  categories: string[];
  score: number;
};

export type reviewDataType = {
  totalPages: 0;
  totalElements: 0;
  size: 0;
  content: reviewType[];
  number: 0;
  sort: {
    empty: true;
    unsorted: true;
    sorted: true;
  };
  numberOfElements: 0;
  pageable: {
    offset: 0;
    sort: {
      empty: true;
      unsorted: true;
      sorted: true;
    };
    unpaged: true;
    pageSize: 0;
    paged: true;
    pageNumber: 0;
  };
  first: true;
  last: true;
  empty: true;
};

export type transformedReviewDataType = {
  content: reviewType[];
  isLast: boolean;
  numberOfElements: number;
};
