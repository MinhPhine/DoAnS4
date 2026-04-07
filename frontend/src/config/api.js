const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Tự động thêm /api nếu địa chỉ bị thiếu
const API_URL = NEXT_PUBLIC_API_URL.endsWith('/api') 
    ? NEXT_PUBLIC_API_URL 
    : `${NEXT_PUBLIC_API_URL}/api`;

export default API_URL;
