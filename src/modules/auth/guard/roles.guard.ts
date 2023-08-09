import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import {
  convertJwtRefreshToken,
  convertJwtAccessToken,
} from '@utils/functions/convertJwtToken';
import config from '@config';
import { DecodedToken } from '@interface/decodedToken';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Allow access if there are no required roles defined
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as DecodedToken;
    if (!decodedToken) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Lấy thời gian hiện tại tính bằng số giây kể từ Unix Epoch
    if (decodedToken.exp && currentTimeInSeconds > decodedToken.exp) {
      const refreshToken = request.headers['x-refresh-token'] || null;
      if (!refreshToken) {
        throw new HttpException(
          'AccessToken has expired',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const decodedRefreshToken = this.jwtService.decode(
        refreshToken,
      ) as DecodedToken;
      if (
        decodedRefreshToken.exp &&
        currentTimeInSeconds > decodedRefreshToken.exp
      ) {
        throw new HttpException(
          'RefreshToken has expired',
          HttpStatus.FORBIDDEN,
        );
      }
      // lấy từ RefreshToken các trường để tạo 1 cặp token mới
      const newAccessToken = await convertJwtAccessToken(
        decodedRefreshToken.uuid,
        decodedRefreshToken.userName,
        decodedRefreshToken.role,
        config.jwt,
      );
      const newRefreshToken = await convertJwtRefreshToken(
        decodedRefreshToken.uuid,
        decodedRefreshToken.userName,
        decodedRefreshToken.role,
        config.jwt,
      );
      // Thêm header mới vào response
      const response = context.switchToHttp().getResponse();
      response.header('X-Refresh-Token', newRefreshToken);
      response.header('X-Access-Token', newAccessToken);
      // lấy role theo RefreshToken
      const userRole = decodedRefreshToken.role;
      // thêm
      // const req = context.switchToHttp().getRequest();
      // req.body.userName = decodedRefreshToken.userName;
      return requiredRoles.includes(userRole);
    }
    // lấy role
    const userRole = decodedToken.role;
    // k nên thêm tên người dùng vì bảo mật và ít số lượng người dùng
    // const req = context.switchToHttp().getRequest();
    // req.body.userName = decodedToken.userName;
    return requiredRoles.includes(userRole);
  }
}
