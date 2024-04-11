import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  loginSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

export async function loginUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await loginSession(user.id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes,
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions(userId, true);

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const session = res.locals.user.session;

  await updateSession(session);

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
