/**
 * Делает первую букву строки заглавной
 * @param string строка
 * @returns строка
 */
export const firstUC = (string?: string) => !string ? '' : string[0].toUpperCase() + string.slice(1);
