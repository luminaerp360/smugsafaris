import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(160)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(200)
  newPassword: string;
}
