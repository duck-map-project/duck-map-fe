export interface MainReview {
  id: number;
  inProgress: boolean;
  image: string;
}

export interface MainReviewResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: MainReview[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}
