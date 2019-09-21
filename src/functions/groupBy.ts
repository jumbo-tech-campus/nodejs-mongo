export const groupBy = <T>(array: T[], groupBy: (item: T) => string): Record<string, T[]> => {
  return array.reduce<Record<string, T[]>>((grouped, item) => {
    const groupName = groupBy(item);
    grouped[groupName] = grouped[groupName] || [];
    grouped[groupName].push(item);

    return grouped;
  }, {});
};