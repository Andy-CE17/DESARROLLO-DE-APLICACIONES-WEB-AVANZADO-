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

  async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
