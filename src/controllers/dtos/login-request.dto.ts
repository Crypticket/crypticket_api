import {model, property} from '@loopback/repository'

@model()
export class LoginRequestDto {
  @property({
    type: 'string',
    required: true,
  })
  username: string

  @property({
    type: 'string',
    required: true,
  })
  password: string
}
