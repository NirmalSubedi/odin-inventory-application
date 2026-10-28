import { getPageValues } from "../utils/aggregate.js";

const fruitUpdatePage = {
  getRequestValues: (req) => {
    const { fruit } = req.params;
    const fruitValue = req.method === "GET" ? fruit : req.body.fruit;

    return { title: `Update Fruit Name for ${fruit}`, fruit, fruitValue };
  },
};

export const getFruitUpdatePageValues = async (req) => {
  return getPageValues(fruitUpdatePage, req);
};
