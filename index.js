const axios = require('axios');
const getCardDetailsAddress = require('./src/address.js');

const buildResultData = (productsList, warehouseId) => productsList.reduce((acc, { id, sizes }) => {
  const data = sizes.map(({ origName, stocks }) => [origName, stocks.find(s => s.wh === warehouseId)?.qty || 0]);
  const result = {
    art: id,
    stock: Object.fromEntries(data),
  };
  return [ ...acc, result];
}, []);

const getKazanWBWareHouseData = async (article) => {
  const warehousesListUrl = 'https://static-basket-01.wbbasket.ru/vol0/data/stores-data.json';
  const productCardUrl = `https://www.wildberries.ru/catalog/${article}/detail.aspx`;
  const warehouseName = 'Казань WB';
  try {
    const url = await getCardDetailsAddress(productCardUrl);
    const kazanWBWareHouseList = await axios.get(warehousesListUrl);
    const { id } = kazanWBWareHouseList.data.find((wh) => wh.name === warehouseName);
    const { data } = await axios.get(url);
    const { products } = data.data;
    return buildResultData(products, id);
  } catch (error) {
    console.error('Network Error, try again', error.message);
  }
};

module.exports = getKazanWBWareHouseData;
