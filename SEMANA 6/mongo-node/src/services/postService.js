import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
  normalizeHashtags(hashtags = "") {
    const values = Array.isArray(hashtags) ? hashtags : hashtags.split(",");

    return values
      .map((hashtag) => hashtag.trim().replace(/^#/, ""))
      .filter(Boolean);
  }

  preparePostData(postData) {
    return {
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl || "",
      hashtags: this.normalizeHashtags(postData.hashtags),
    };
  }

  async createPost(userId, postData) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return await postRepository.create({
      ...this.preparePostData(postData),
      user: user._id,
    });
  }

  async getPosts() {
    return await postRepository.findAll();
  }

  async getPostsByUser(userId) {
    return await postRepository.findByUser(userId);
  }

  async getPostById(postId) {
    const post = await postRepository.findById(postId);

    if (!post) {
      throw new Error("Publicación no encontrada");
    }

    return post;
  }

  async getAuthors() {
    return await userRepository.findAll();
  }

  async updatePost(postId, userId, postData) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const updatedPost = await postRepository.update(postId, {
      ...this.preparePostData(postData),
      user: user._id,
    });

    if (!updatedPost) {
      throw new Error("Publicación no encontrada");
    }

    return updatedPost;
  }

  async deletePost(postId) {
    const deletedPost = await postRepository.delete(postId);

    if (!deletedPost) {
      throw new Error("Publicación no encontrada");
    }

    return deletedPost;
  }
}

export default new PostService();
