const chalk = require('chalk');

const onEsbuildError = ({path}) => e => {
  if (e.message.indexOf(path) !== -1) {
    console.log(
      ` > did you create your App ?\n try [${chalk.bold.green(
        'npx reactor create'
      )}]`
    );
  }
};

module.exports = onEsbuildError;
