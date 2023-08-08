import * as jwt from 'jsonwebtoken';

export interface DecodedToken extends jwt.JwtPayload {
  // Bổ sung các thuộc tính của token (nếu có) mà bạn muốn sử dụng trong guard
}
