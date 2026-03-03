/**
 * Clean Premium Script - Tối ưu hóa cho RevenueCat & Locket Badge
 * Status: Fixed & Optimized with Badge Support
 */

let obj = JSON.parse($response.body);
const ua = ($request.headers['User-Agent'] || $request.headers['user-agent'] || "").toLowerCase();

// 1. Khởi tạo cấu trúc nếu chưa có
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};

// --- PHẦN THÊM MỚI: KÍCH HUY HIỆU ---
// Khởi tạo thuộc tính người dùng để chèn Badge
obj.subscriber.subscriber_attributes = obj.subscriber.subscriber_attributes || {};
// -------------------------------------

const purchaseDate = "2026-02-03T00:00:00Z";
const expiresDate = "2099-12-31T23:59:59Z";

const subscriptionData = {
  "is_sandbox": false,
  "ownership_type": "PURCHASED",
  "billing_issues_detected_at": null,
  "period_type": "normal",
  "expires_date": expiresDate,
  "purchase_date": purchaseDate,
  "store": "app_store"
};

const entitlementData = {
  "grace_period_expires_date": null,
  "purchase_date": purchaseDate,
  "product_identifier": "",
  "expires_date": expiresDate
};

const appMapping = {
  'locket': { entitlement: 'Gold', product: 'com.locket.gold.yearly' },
  'ticket': { entitlement: 'vip', product: 'vip+watch_vip' }
};

let activeApp = null;
for (let key in appMapping) {
  if (ua.includes(key)) {
    activeApp = appMapping[key];
    break;
  }
}

if (activeApp) {
  const { entitlement, product } = activeApp;
  entitlementData.product_identifier = product;
  obj.subscriber.subscriptions[product] = subscriptionData;
  obj.subscriber.entitlements[entitlement] = entitlementData;

  // --- PHẦN THÊM MỚI: GÁN HUY HIỆU CHO LOCKET ---
  if (ua.includes('locket')) {
    obj.subscriber.subscriber_attributes["badge_type"] = {
      "value": "gold_badge", // Tên định danh huy hiệu vàng
      "updated_at": "2026-02-03T00:00:00Z"
    };
  }
  // ----------------------------------------------

} else {
  const defaultProduct = "com.premium.yearly";
  entitlementData.product_identifier = defaultProduct;
  obj.subscriber.subscriptions[defaultProduct] = subscriptionData;
  obj.subscriber.entitlements["pro"] = entitlementData;
}

$done({ body: JSON.stringify(obj) });
