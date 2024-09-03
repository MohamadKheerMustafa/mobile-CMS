export const getNextId = (data) => {
  const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
  return maxId + 1;
};
