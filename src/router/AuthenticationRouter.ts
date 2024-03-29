import AuthenticationController from "../controllers/user.controller";
import BaseRoutes from "./base/BaseRouter";

class AuthenticationRoutes extends BaseRoutes {
  routes(): void {
    this.router.post("/login", AuthenticationController.login);
    this.router.post("/register", AuthenticationController.register);
  }
}

export default new AuthenticationRoutes().router;
