export const getPossiblePathArray = (pathname?: string): string[] =>
  !pathname
    ? []
    : pathname.split('/')
      .reduce((acc, path) => !path
        ? acc
        : [
          ...acc,
          `${acc[acc.length - 1] ?? ''}/${path}`,
        ], [] as string[]);
