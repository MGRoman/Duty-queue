import { useCallback, useState } from "react";

export const useParams = <TParams extends any[] = any[]>() => {
  const [params, setParams] = useState<TParams>([] as any);

  const setParamsHandler = useCallback((parameters: TParams) => {
    setParams(() => parameters);
  }, []);

  const clearParamsHandler = useCallback(() => {
    setParams(() => [] as any);
  }, []);

  return { params, setParamsHandler, clearParamsHandler };
};
