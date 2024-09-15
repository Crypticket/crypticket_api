import {inject} from '@loopback/core';
import {post, requestBody, response, Response, RestBindings} from '@loopback/rest';
import {AccountService} from '../services';
import {AccountDto, NewAccountDto} from './dtos';

export class AccountController {
  constructor(
    @inject('services.AccountService')
    private readonly accountService: AccountService,
    @inject(RestBindings.Http.RESPONSE)
    protected httpResponse: Response,
  ) { }

  @post('/sign-up')
  @response(201)
  async signup(
    @requestBody()
    newAccount: NewAccountDto
  ): Promise<AccountDto> {
    this.httpResponse.status(201);
    const createdAccount = await this.accountService.createAccount(newAccount);
    return AccountDto.fromAccountModel(createdAccount)
  }
}
