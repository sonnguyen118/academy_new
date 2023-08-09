import { JwtService } from '@nestjs/jwt';
import config from '@config';

interface JwtPayload {
  uuid: string;
  userName: string;
  role: string;
}

export function convertJwtAccessToken(
  userId: string,
  userName: string,
  role: string,
  secret: string,
): string {
  const payload: JwtPayload = {
    uuid: userId,
    userName,
    role,
  };

  const jwtService = new JwtService(); // Khởi tạo JwtService
  return jwtService.sign(payload, {
    secret,
    expiresIn: config.lifecycle_refreshtoken,
  });
}

export function convertJwtRefreshToken(
  userId: string,
  userName: string,
  role: string,
  secret: string,
): string {
  const payload: JwtPayload = {
    uuid: userId,
    userName,
    role,
  };

  const jwtService = new JwtService(); // Khởi tạo JwtService
  return jwtService.sign(payload, {
    secret,
    expiresIn: config.lifecycle_refreshtoken,
  });
}

export function convertJwtTemporaryToken(
  userId: string,
  userName: string,
  role: string,
  secret: string,
): string {
  const payload: JwtPayload = {
    uuid: userId,
    userName,
    role,
  };

  const jwtService = new JwtService(); // Khởi tạo JwtService
  return jwtService.sign(payload, {
    secret,
    expiresIn: config.lifecycle_temporarytoken,
  });
}
