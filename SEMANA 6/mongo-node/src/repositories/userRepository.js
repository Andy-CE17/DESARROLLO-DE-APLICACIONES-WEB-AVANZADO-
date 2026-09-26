import User from "../models/User.js";

class UserRepository {
  async create(user) {
    return await User.create(user);
  }

  async findAll() {
    return await User.find().sort({ name: 1, lastName: 1 });
  }

  async findById(id) {
    return await User.findById(id);
  }
}

export default new UserRepository();
