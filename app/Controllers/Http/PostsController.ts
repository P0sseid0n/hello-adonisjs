import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from "App/Models/Post";

import { StoreValidator, UpdateValidator } from "App/Validators/Post";

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.query().preload("author");

    return posts;
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator);

    if (!data.title || !data.title)
      return response.badRequest({ message: "Dados faltando" });

    const user = await auth.authenticate();

    const post = await Post.create({ ...data, authorId: user.id });

    await post.load("author");

    return post;
  }

  public async show({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    await post.load("author");

    return post;
  }

  public async update({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);
    const data = await request.validate(UpdateValidator);

    post.merge(data);

    await post.save();

    await post.load("author");

    post.serialize({
      fields: {
        omit: ["created_at"],
      },
    });

    return post;
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    await post.delete();
  }
}
