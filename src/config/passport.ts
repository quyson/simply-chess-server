const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
import AppDataSource from "../program";
import { UserEntity } from "../entity/userEntity";
import CustomError from "./error";
const passport = require("passport");
require("dotenv").config();

const secretOrKey: string = process.env.SECRET_KEY as string;

interface Options {
  jwtFromRequest: string;
  secretOrKey: string;
}

interface JwtPayload {
  id: number;
  username: string;
}

const options: Options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey,
};

passport.use(
  new JwtStrategy(
    options,
    (
      jwt_payload: JwtPayload,
      done: (err: CustomError | null, response?: any) => void
    ) => {
      const userRepository = AppDataSource.getRepository(UserEntity);
      userRepository
        .findOne({
          where: { username: jwt_payload.username, id: jwt_payload.id },
        })
        .then((user) => {
          if (user) {
            console.log("success");
            return done(null, user);
          } else {
            console.log("error");
            const err = new CustomError("Invalid Token", 401);
            return done(err, false);
          }
        });
    }
  )
);

passport.serializeUser(function (
  user: UserEntity,
  done: (err: CustomError | null, response?: any) => void
) {
  done(null, user.id);
});

passport.deserializeUser(async function (
  id: number,
  done: (err: any, response?: any) => void
) {
  try {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: id } });
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});
