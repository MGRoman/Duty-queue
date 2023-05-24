/**
 * Сама простая утилита валидации значения типа string или string[]:
 * @param исходная строка или массив строк, необязательный
 * @returns возвращает булево значение, true: непустая несостоящая только из пробелов строка
 * или непустой массив, не состоящий из пустых строк
 */
export const commonValidation = (value?: string | string[]) => {
  if (
    typeof value === "undefined" ||
    (typeof value === "string" && !value.trim()) ||
    (Array.isArray(value) && (!value.length || value.every((elem) => !elem.trim())))
  ) {
    return {
      message: "поле не может быть пустым",
    };
  }

  return undefined;
};
