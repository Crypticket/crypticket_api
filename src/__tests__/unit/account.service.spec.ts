import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import {Account, NewAccount} from '../../models';
import {AccountRepository} from '../../repositories';
import {AccountService} from '../../services';

describe('Account Service Test', () => {
  const sandbox = sinon.createSandbox();
  let accountService: AccountService;
  before(() => {
    const accountRepository = sandbox.createStubInstance(AccountRepository);
    accountService = new AccountService(accountRepository);
  });
  afterEach(() => {sandbox.restore()});

  it('creates not null account', async () => {
    const newAcc: NewAccount = {email: "leo@gmail.com", username: "leo", password: "1234"};
    const createdAcc: Account = await accountService.createAccount(newAcc);
    expect(createdAcc).not.to.be.null();
  });
});
