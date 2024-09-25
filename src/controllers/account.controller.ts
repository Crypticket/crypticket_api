import {inject} from '@loopback/core';
import {
  post,
  requestBody,
  response,
  Response,
  RestBindings,
} from '@loopback/rest';
import {AccountService} from '../services';
import {AccountCreationRequestDto, AccountDto, LoginRequestDto} from './dtos';

export class AccountController {
  constructor(
    @inject('services.AccountService')
    private readonly accountService: AccountService,
    @inject(RestBindings.Http.RESPONSE)
    protected httpResponse: Response,
  ) {}

  @post('/sign-up')
  @response(201)
  async signup(
    @requestBody()
    newAccount: AccountCreationRequestDto
  ): Promise<AccountDto> {
    this.httpResponse.status(201);
    const createdAccount = await this.accountService.createAccount(newAccount);
    return AccountDto.fromAccountModel(createdAccount);
  }

  @post('/login')
  @response(201)
  async login(
    @requestBody()
    auth: LoginRequestDto
  ): Promise<AccountDto> {
    this.httpResponse.status(201);
    const login = await this.accountService.authenticate(auth);
    //TODO: que hago si la cuenta es nulo? como mando un error 401 UnAuthorized?
    return login;
  }
}
