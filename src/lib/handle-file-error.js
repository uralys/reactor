import chalk from 'chalk';

const onFileError =
  ({path}) =>
  e => {
    if (e.message.indexOf(path) !== -1) {
      console.log(
        ` > did you create your App ?\n try [${chalk.bold.green(
          'npx reactor create'
        )}]`
      );
    }
  };

export default onFileError;
