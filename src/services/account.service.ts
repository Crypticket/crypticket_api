import {injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Account, NewAccount} from '../models';
import {AccountRepository} from '../repositories';

@injectable()
export class AccountService {
  constructor(
    @repository(AccountRepository)
    private readonly accountRepository: AccountRepository,
  ) {}

  async createAccount(newAccount: NewAccount): Promise<Account> {
    // TODO: Verify the email and username are available
    // TODO: Hash the password
    return this.accountRepository.createOne(newAccount);
  }
}
