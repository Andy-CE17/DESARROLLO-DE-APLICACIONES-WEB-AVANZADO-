import Post from "../models/Post.js";

class PostRepository {
  async create(post) {
    return await Post.create(post);
  }

  async findAll() {
    return await Post.find().populate("user").sort({ createdAt: -1, _id: -1 });
  }

  async findById(postId) {
    return await Post.findById(postId).populate("user");
  }

  async findByUser(userId) {
    return await Post.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1, _id: -1 });
  }

  async countByUser(userId) {
    return await Post.countDocuments({ user: userId });
  }

  async update(postId, postData) {
    return await Post.findByIdAndUpdate(postId, postData, {
      new: true,
      runValidators: true,
    }).populate("user");
  }

  async delete(postId) {
    return await Post.findByIdAndDelete(postId);
  }
}

export default new PostRepository();
