export interface mylikeType {
  id: number;
  storeName: string;
  inProgress: boolean;
  address: number;
  artists: [
    {
      id: number;
      groupId: number;
      groupName: string;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }
  ];
  categories: [
    {
      id: number;
      category: string;
    }
  ];
  image: string;
  likeId: number;
  bookmarkId: number;
}
[];

export interface mylikeEventsType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      storeName: string;
      inProgress: boolean;
      address: number;
      artists: [
        {
          id: number;
          groupId: number;
          groupName: string;
          name: string;
          image: string;
          artistType: {
            id: number;
            type: string;
          };
        }
      ];
      categories: [
        {
          id: number;
          category: string;
        }
      ];
      image: string;
      likeId: number;
      bookmarkId: number;
    }
  ];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    unpaged: boolean;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface transformedMylike {
  numberOfElements: number;
  isLast: boolean;
  content: [
    {
      id: number;
      storeName: string;
      inProgress: boolean;
      address: number;
      artists: [
        {
          id: number;
          groupId: number;
          groupName: string;
          name: string;
          image: string;
          artistType: {
            id: number;
            type: string;
          };
        }
      ];
      categories: [
        {
          id: number;
          category: string;
        }
      ];
      image: string;
      likeId: number;
      bookmarkId: number;
    }
  ];
}

export interface myreviewType {
  id: number;
  eventId: number;
  eventStoreName: string;
  createdAt: string;
  score: number;
  reviewImage: string;
  content: string;
}

export interface myreviewsType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      eventId: number;
      eventStoreName: string;
      createdAt: string;
      score: number;
      reviewImage: string;
      content: string;
    }
  ];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    unpaged: boolean;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface transformedMyreview {
  numberOfElements: number;
  isLast: boolean;
  content: [
    {
      id: number;
      eventId: number;
      eventStoreName: string;
      createdAt: string;
      score: number;
      reviewImage: string;
      content: string;
    }
  ];
}

export interface myevetType {
  id: number;
  storeName: string;
  inProgress: boolean;
  address: string;
  artists: [
    {
      id: number;
      groupId: number;
      groupName: string;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }
  ];
  categories: [
    {
      id: number;
      category: string;
    }
  ];
  image: string;
  likeId: number;
  bookmarkId: number;
}

export interface myeventsType {
  totalPages: number;
  totalElements: number;
  size: number;
  content: [
    {
      id: number;
      storeName: string;
      inProgress: boolean;
      address: string;
      artists: [
        {
          id: number;
          groupId: number;
          groupName: string;
          name: string;
          image: string;
          artistType: {
            id: number;
            type: string;
          };
        }
      ];
      categories: [
        {
          id: number;
          category: string;
        }
      ];
      image: string;
      likeId: number;
      bookmarkId: number;
    }
  ];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    unpaged: boolean;
    pageSize: number;
    paged: boolean;
    pageNumber: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface transformedMyevents {
  numberOfElements: number;
  isLast: boolean;
  content: [
    {
      id: number;
      storeName: string;
      inProgress: boolean;
      address: string;
      artists: [
        {
          id: number;
          groupId: number;
          groupName: string;
          name: string;
          image: string;
          artistType: {
            id: number;
            type: string;
          };
        }
      ];
      categories: [
        {
          id: number;
          category: string;
        }
      ];
      image: string;
      likeId: number;
      bookmarkId: number;
    }
  ];
}
