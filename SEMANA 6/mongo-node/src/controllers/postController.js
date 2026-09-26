import postService from "../services/postService.js";

const withUploadedImage = (body, file) => ({
  ...body,
  imageUrl: file
    ? `/uploads/${file.filename}`
    : body.imageUrl || body.existingImageUrl || "",
});

class PostController {
  async getAll(req, res) {
    try {
      const posts = req.query.userId
        ? await postService.getPostsByUser(req.query.userId)
        : await postService.getPosts();

      res.render("posts", {
        posts,
        filteredByUser: Boolean(req.query.userId),
        success: req.query.success || "",
        error: req.query.error || "",
      });
    } catch (error) {
      res.status(500).render("error", {
        status: 500,
        title: "No pudimos cargar las publicaciones",
        message: error.message,
      });
    }
  }

  async showCreateForm(req, res) {
    try {
      const users = await postService.getAuthors();

      res.render("post-form", {
        mode: "create",
        post: {},
        users,
        error: "",
      });
    } catch (error) {
      res.status(500).render("error", {
        status: 500,
        title: "No pudimos preparar el formulario",
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const postData = withUploadedImage(req.body, req.file);
      await postService.createPost(postData.userId, postData);
      res.redirect("/posts?success=Publicación creada correctamente");
    } catch (error) {
      const users = await postService.getAuthors();

      res.status(400).render("post-form", {
        mode: "create",
        post: { ...req.body, user: req.body.userId },
        users,
        error: error.message,
      });
    }
  }

  async showEditForm(req, res) {
    try {
      const [post, users] = await Promise.all([
        postService.getPostById(req.params.id),
        postService.getAuthors(),
      ]);

      res.render("post-form", {
        mode: "edit",
        post,
        users,
        error: "",
      });
    } catch (error) {
      res.status(404).render("error", {
        status: 404,
        title: "Publicación no encontrada",
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const postData = withUploadedImage(req.body, req.file);
      await postService.updatePost(req.params.id, postData.userId, postData);
      res.redirect("/posts?success=Publicación actualizada correctamente");
    } catch (error) {
      const users = await postService.getAuthors();

      res.status(400).render("post-form", {
        mode: "edit",
        post: { ...req.body, _id: req.params.id, user: req.body.userId },
        users,
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      await postService.deletePost(req.params.id);
      res.redirect("/posts?success=Publicación eliminada correctamente");
    } catch (error) {
      res.redirect(`/posts?error=${encodeURIComponent(error.message)}`);
    }
  }
}

export default new PostController();
