import {
  MutationDefinition,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  FetchArgs,
} from '@reduxjs/toolkit/dist/query';
import {
  QueryReturnValue,
  BaseQueryApi,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { ArtistDataType, EditArtistDataType } from '../types/artistsType';
import { ArtisttypeType, AritsttypeAddType } from '../types/artisttypeType';

import handleErrorResponse from './handleErrorResponse';

type Data =
  | ArtistDataType
  | EditArtistDataType
  | AritsttypeAddType
  | ArtisttypeType;

export type ApiFunction<T extends Data> = MutationTrigger<
  MutationDefinition<
    T,
    (
      args: string | FetchArgs,
      api: BaseQueryApi,
      extraOptions: object
    ) => Promise<
      QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
    >,
    any,
    'api'
  >
>;

export const performApiAction = async <T extends Data>(
  data: T,
  apiFunction: ApiFunction<T>,
  extraFunction?: () => void,
  successMessage?: string
) => {
  try {
    const res = await apiFunction(data);

    if ('data' in res) {
      successMessage && alert(successMessage);
      extraFunction && extraFunction();
    } else if ('error' in res) {
      handleErrorResponse(res.error);
    }
  } catch (error) {
    console.error(error);
  }
};
