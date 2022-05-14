import test from 'ava';
import reactor, {BUILD, createCLI} from './reactor.js';

// -----------------------------------------------------------------------------

test('should show help when no command is provided', async t => {
  const cli = createCLI([]);
  cli.showHelpOnFail(false);
  cli.demandCommand(0);
  const result = await reactor(cli.argv);
  t.is(result, false);
});

// -----------------------------------------------------------------------------

test(`should run ${BUILD} command`, async t => {
  const cli = createCLI([BUILD]);
  const result = await reactor(cli.argv);
  t.is(result, true);
});
