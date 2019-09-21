export const findAndRemove = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
  const index     = array.findIndex(predicate);
  const foundItem = index !== -1;

  if (!foundItem) {
    return;
  }

  const item = array[index];
  array.splice(index, 1);

  return item;
};