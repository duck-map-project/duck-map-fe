export interface ArtistValue {
  artistTypeId: number;
  groupId: number;
  name: string;
  image: string;
}

export interface ArtistsData {
  totalElements: number;
  totalPages: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
    offset: number;
  };
  size: number;
  content: [
    {
      id: number;
      groupId: number | null;
      groupName: string | null;
      name: string;
      image: string;
      artistType: {
        id: number;
        type: string;
      };
    }
  ];
  empty: boolean;
}

export type ArtistContent = Pick<
  ArtistsData['content'][0],
  'id' | 'groupId' | 'groupName' | 'name' | 'image' | 'artistType'
>;
