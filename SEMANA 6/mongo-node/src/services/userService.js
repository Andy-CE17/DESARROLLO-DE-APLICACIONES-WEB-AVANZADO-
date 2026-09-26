import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class UserService {
  prepareUserData(userData, editing = false) {
    const data = {
      name: userData.name?.trim(),
      lastName: userData.lastName?.trim(),
      email: userData.email?.trim().toLowerCase(),
      age: Number(userData.age),
      phoneNumber: userData.phoneNumber?.trim() || "",
    };

    if (!editing || userData.password) data.password = userData.password;
    return data;
  }

  async getUsers() {
    const users = await userRepository.findAll();

    return await Promise.all(
      users.map(async (user) => ({
        user,
        postCount: await postRepository.countByUser(user._id),
      })),
    );
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async createUser(userData) {
    return await userRepository.create(this.prepareUserData(userData));
  }

  async updateUser(id, userData) {
    const updatedUser = await userRepository.update(
      id,
      this.prepareUserData(userData, true),
    );
    if (!updatedUser) throw new Error("Usuario no encontrado");
    return updatedUser;
  }

  async deleteUser(id) {
    const postCount = await postRepository.countByUser(id);
    if (postCount > 0) {
      throw new Error("No puedes eliminar un usuario que tiene publicaciones registradas.");
    }

    const deletedUser = await userRepository.delete(id);
    if (!deletedUser) throw new Error("Usuario no encontrado");
    return deletedUser;
  }
}

export default new UserService();
