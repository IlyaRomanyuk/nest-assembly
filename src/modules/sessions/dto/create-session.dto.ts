export class CreateSessionDto {
  userId: number;
  refreshToken: string;
  expiresIn?: number;
}
