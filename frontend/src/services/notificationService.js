import API_URL from "@/config/api";

export const notificationService = {
  // Get all notifications for the current user
  async getAll(token) {
    const res = await fetch(`${API_URL}/notifications`, {
      headers: {
        'x-auth-token': token
      }
    });
    return res.json();
  },

  // Mark a single notification as read
  async markAsRead(id, token) {
    const res = await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'PUT',
      headers: {
        'x-auth-token': token
      }
    });
    return res.json();
  },

  // Mark all notifications as read
  async markAllAsRead(token) {
    const res = await fetch(`${API_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: {
        'x-auth-token': token
      }
    });
    return res.json();
  }
};
