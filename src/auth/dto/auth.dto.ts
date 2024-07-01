export class authDto {
  name?: string;
  username: string;
  password: string;
  email?: string;
}

export class VerificationDto {
  email: string;
  code: string;
}
