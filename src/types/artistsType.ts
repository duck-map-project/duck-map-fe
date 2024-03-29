export type ArtistType = {
  id: number;
  type: string;
};

export interface ArtistDataType {
  artistTypeId: number;
  groupId?: number | null;
  name: string;
  image: string;
}

export type EditArtistDataType = {
  artistId: number;
  artistValue: ArtistDataType;
};

export interface ArtistsRawDataType {
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
  ArtistsRawDataType['content'][0],
  'id' | 'groupId' | 'groupName' | 'name' | 'image' | 'artistType'
>;
