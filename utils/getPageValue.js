export const getPageValue = async (page) => {
  const { loader, ...rest } = page;
  const asyncData = await loader();
  return { ...rest, ...asyncData };
};
