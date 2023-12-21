const getKazanWBWareHouseData = require('../index.js');

const showResultData = async (article) => {
  const result = await getKazanWBWareHouseData(article);
  console.log(result);
};

module.exports = showResultData;

