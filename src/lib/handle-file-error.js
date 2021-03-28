const chalk = require('chalk');

const onFileError = ({path}) => e => {
  if (e.message.indexOf(path) !== -1) {
    console.log(
      ` > did you create your App ?\n try [${chalk.bold.green(
        'npx reactor create'
      )}]`
    );
  }
};

module.exports = onFileError;
