export const getPageValues = async (page, req) => {
  const { getDBValues, getRequestValues, ...staticValues } = page;

  let DBValues;
  if (getDBValues) {
    DBValues = await getDBValues(req);
  }

  let requestValues;
  if (getRequestValues) requestValues = getRequestValues(req);

  return { ...staticValues, ...DBValues, ...requestValues };
};
