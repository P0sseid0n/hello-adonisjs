import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthValidator from "App/Validators/AuthValidator";

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator);

    const token = auth.attempt(email, password, {
      expiresIn: "7 days",
    });

    return token;
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout();
  }
}
