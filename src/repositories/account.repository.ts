import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Account, AccountRelations, NewAccount} from '../models';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {
  constructor(@inject('datasources.postgres') dataSource: PostgresDataSource) {
    super(Account, dataSource);
  }

  async createOne(newAccount: NewAccount): Promise<Account> {
    return this.save(
      new Account({
        ...newAccount,
        registerDate: new Date(),
      }),
    );
  }

  async findByEmail(email: string): Promise<Account | null> {
    return this.findOne({where: {email}});
  }
}
