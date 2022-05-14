import test from 'ava';
import reactor, {BUILD, createCLI} from './reactor.js';

test('should show help when no command is provided', t => {
  const cliParams = [];
  const cli = createCLI(cliParams);
  cli.showHelpOnFail(false);
  cli.demandCommand(0);
  const result = reactor(cli.argv);
  t.is(result, false);
});

test(`should run ${BUILD} command`, t => {
  const cliParams = [BUILD];
  const cli = createCLI(cliParams);
  const result = reactor(cli.argv);
  t.is(result, true);
});
