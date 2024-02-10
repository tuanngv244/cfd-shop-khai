export const sumArrayNumber = (arr, initialValue = 0) => {
  return (
    arr?.reduce((cur, next) => Number(cur) + Number(next), initialValue) || 0
  );
};
