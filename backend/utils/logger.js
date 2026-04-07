const SystemLog = require('../models/SystemLog');

/**
 * Ghi một system log vào database
 * @param {Object} opts
 * @param {string}  opts.action   - Hành động, vd: 'DELETE_PRODUCT'
 * @param {string}  opts.module   - Module, vd: 'Products'
 * @param {string}  [opts.details] - Mô tả thêm
 * @param {*}       [opts.userId]  - ObjectId của user thực hiện
 * @param {string}  [opts.ip]     - IP address
 */
async function logAction({ action, module, details = '', userId = null, ip = '' }) {
  try {
    await SystemLog.create({
      action,
      module,
      details,
      user: userId || undefined,
      ipAddress: ip,
    });
  } catch (err) {
    // Không để lỗi log làm crash request
    console.error('[Logger] Lỗi ghi log:', err.message);
  }
}

module.exports = { logAction };
