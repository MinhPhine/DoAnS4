import API_URL from "@/config/api";

export const articleService = {
  // Get all articles
  async getAll() {
    const res = await fetch(`${API_URL}/articles`);
    return res.json();
  },

  // Get article by slug
  async getBySlug(slug) {
    const res = await fetch(`${API_URL}/articles/${slug}`);
    return res.json();
  },

  // Get comments for an article
  async getComments(articleId) {
    const res = await fetch(`${API_URL}/comments/${articleId}`);
    return res.json();
  },

  // Post a comment
  async postComment(commentData, token) {
    const res = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(commentData)
    });
    return res.json();
  }
};

export const categoryService = {
  async getAll() {
    const res = await fetch(`${API_URL}/categories?type=article`);
    return res.json();
  }
};
