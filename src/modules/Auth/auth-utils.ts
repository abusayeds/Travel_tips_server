import jwt  from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { id: string | undefined; name : string, userEmail: string, role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};