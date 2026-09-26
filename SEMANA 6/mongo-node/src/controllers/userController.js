import userService from "../services/userService.js";

const friendlyError = (error) => {
  if (error?.code === 11000) return "Ya existe un usuario con ese correo electrónico.";
  return error.message;
};

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getUsers();
      res.render("users", {
        users,
        success: req.query.success || "",
        error: req.query.error || "",
      });
    } catch (error) {
      res.status(500).render("error", {
        status: 500,
        title: "No pudimos cargar los usuarios",
        message: friendlyError(error),
      });
    }
  }

  showCreateForm(req, res) {
    res.render("user-form", { mode: "create", user: {}, error: "" });
  }

  async create(req, res) {
    try {
      await userService.createUser(req.body);
      res.redirect("/users?success=Usuario registrado correctamente");
    } catch (error) {
      res.status(400).render("user-form", {
        mode: "create",
        user: req.body,
        error: friendlyError(error),
      });
    }
  }

  async showEditForm(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.render("user-form", { mode: "edit", user, error: "" });
    } catch (error) {
      res.status(404).render("error", {
        status: 404,
        title: "Usuario no encontrado",
        message: friendlyError(error),
      });
    }
  }

  async update(req, res) {
    try {
      await userService.updateUser(req.params.id, req.body);
      res.redirect("/users?success=Usuario actualizado correctamente");
    } catch (error) {
      res.status(400).render("user-form", {
        mode: "edit",
        user: { ...req.body, _id: req.params.id },
        error: friendlyError(error),
      });
    }
  }

  async delete(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.redirect("/users?success=Usuario eliminado correctamente");
    } catch (error) {
      res.redirect(`/users?error=${encodeURIComponent(friendlyError(error))}`);
    }
  }
}

export default new UserController();
