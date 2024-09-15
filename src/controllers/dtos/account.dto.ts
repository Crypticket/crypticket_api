import {model, property} from '@loopback/repository';
import {Account} from '../../models';

@model()
export class AccountDto {
  @property({
    type: 'string',
  })
  id: string

  @property({
    type: 'string',
  })
  email: string

  @property({
    type: 'string',
  })
  username: string

  @property({
    type: 'string',
  })
  registerDate: Date

  static fromAccountModel(account: Account): AccountDto {
    return {
      id: account.id,
      email: account.email,
      username: account.username,
      registerDate: account.registerDate,
    }
  }
}
