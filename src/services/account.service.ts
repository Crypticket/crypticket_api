import {injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Account, AccountCreationRequest, LoginRequest} from '../models';
import {AccountRepository} from '../repositories';
import {Blockchain, initiateDeveloperControlledWalletsClient} from '@circle-fin/developer-controlled-wallets';
import * as bcrypt from 'bcryptjs';
import {HttpErrors} from '@loopback/rest';


@injectable()
export class AccountService {
  constructor(
    @repository(AccountRepository)
    private readonly accountRepository: AccountRepository,
  ) { }

  async createAccount(accountCreationRequest: AccountCreationRequest): Promise<Account> {
    //TODO: supongo que primero es verificar que una cuenta con ese correo no exista
    const client = initiateDeveloperControlledWalletsClient({
      apiKey: process.env.CIRCLE_API_KEY ?? "",
      entitySecret: process.env.CIRCLE_ENTITY_SECRET ?? "",
    });
    //TODO: ENVS
    //TODO: encriptar password para la database
    const response = await client.createWallets({
      blockchains: ['SOL-DEVNET'],
      count: 1,
      walletSetId: process.env.CIRCLE_WALLET_SET_ID ?? "",
    });
    return this.accountRepository.createOne({
      ...accountCreationRequest,
      walletId: response.data?.wallets[0].id ?? "",
    });
  }

  async authenticate(auth: LoginRequest): Promise<Account> {
    const account = await this.accountRepository.findByUsername(auth.username);
    if (!account) {
      throw new HttpErrors[404]("Invalid username");
    } else if (!bcrypt.compareSync(auth.username, account.password)) {
      throw new HttpErrors[401]("Invalid Password");
    }
    return account;
  }
}
