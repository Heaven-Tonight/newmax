const { Command } = require('commander');
const showResultData = require('../src/resultData.js');

const program = new Command();

const showResult = async () => {
  program
    .description('shows info by sizes of Kazan WB warehouse product stock')
    .arguments('article')
    .action(async (article) => {
      showResultData(article);
    });
  program.parse();
};

module.exports = showResult;
