/**
 * Функция получения строки параметров для URL из объекта
 * @param requestParamsObject объект с параметрами, ключи где значения объекта отсутствуют отфильтровываются
 * @returns строка
 */
export const queryStringToObject =
  (queryString?: string) => {
    if (!queryString || queryString === '?') return {} as Record<string, string | undefined>;

    return queryString
      .slice(1)
      .split('&')
      .reduce((acc, e) => {
        const [key, value] = e.split('=');

        return key
          ? { ...acc, [key]: value || undefined }
          : { ...acc };
      }, {}) as Record<string, string | undefined>;
  };