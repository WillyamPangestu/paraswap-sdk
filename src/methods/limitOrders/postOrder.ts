import { API_URL } from '../../constants';
import type { ConstructFetchInput } from '../../types';
import type {
  LimitOrderFromApi,
  LimitOrderToSend,
  RawLimitOrder,
} from './helpers/types';

export type OpenLimitOrder = LimitOrderFromApi & { status: 'open' };

type PostLimitOrder = (
  limitOrderWithSignature: LimitOrderToSend,
  signal?: AbortSignal
) => Promise<OpenLimitOrder>;

export type PostLimitOrderFunctions = {
  postLimitOrder: PostLimitOrder;
};

export const constructPostLimitOrder = ({
  apiURL = API_URL,
  // network, @TODO would it make more sense to post by network?
  fetcher,
}: ConstructFetchInput): PostLimitOrderFunctions => {
  const fetchURL = `${apiURL}/orders`;

  const postLimitOrder: PostLimitOrder = async (
    limitOrderWithSignature,
    signal
  ) => {
    // @TODO check API return matches
    const newOrder = await fetcher<RawLimitOrder>({
      url: fetchURL,
      method: 'POST',
      data: limitOrderWithSignature,
      signal,
    });
    console.log(
      '🚀 ~ file: postOrder.ts ~ line 40 ~ created newOrder',
      newOrder
    );

    return { ...newOrder, status: 'open' };
  };

  return { postLimitOrder };
};
