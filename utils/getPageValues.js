export const getPageValues = async (page, req) => {
  const { getDBValues, getRequestValues, ...staticValues } = page;
  const DBValues = await getDBValues(req);

  let requestValues;
  if (getRequestValues) requestValues = getRequestValues(req);

  return { ...staticValues, ...DBValues, ...requestValues };
};
