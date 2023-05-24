import { useCallback, useEffect } from "react";

import { useFetchReducer } from "./use-fetch-reducer";
import { useParams } from "./use-params";
import { useTrigger } from "hooks";
import { tuple } from "utils";

export const useCallbackAsync = <TData, TError = any, TParams extends any[] = any[]>(
  callback: (...args: TParams) => Promise<TData>
) => {
  const { state, init, request, success, failure } = useFetchReducer<TData, TError>();

  const [isStartFetch, { onHandler: fetchStart, offHandler: fetchFinish }] = useTrigger();

  const { params, setParamsHandler, clearParamsHandler } = useParams<TParams>();

  useEffect(() => {
    if (!isStartFetch) return;

    let cancelRequest = false;

    callback(...params)
      .then((data) => {
        if (cancelRequest) return;
        fetchFinish();
        success(data);
        clearParamsHandler();
      })
      .catch((error) => {
        if (cancelRequest) return;

        fetchFinish();

        if ((error as any)?.response?.data) {
          const message = (error as any)?.response?.statusText ?? (error as any)?.response?.data;
          const status = (error as any)?.response?.status;

          const outputError =
            typeof (error as any)?.response?.data === "string" ? { message, status } : (error as any)?.response?.data;

          failure(outputError);
        } else {
          failure(error);
        }

        clearParamsHandler();
      });

    return () => {
      cancelRequest = true;
    };
  }, [callback, failure, fetchFinish, isStartFetch, success, params, clearParamsHandler]);

  const doFetch = useCallback(
    (...parameters: TParams) => {
      setParamsHandler(parameters);
      request();
      fetchStart();
    },
    [request, fetchStart, setParamsHandler]
  );

  return tuple(state, doFetch, init);
};
