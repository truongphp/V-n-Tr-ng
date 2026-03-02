/**
 * Clean Premium Script - Tối ưu hóa cho RevenueCat
 * Status: Fixed & Optimized
 */

let obj = JSON.parse($response.body);
const ua = ($request.headers['User-Agent'] || $request.headers['user-agent'] || "").toLowerCase();

// 1. Khởi tạo cấu trúc nếu chưa có (Tránh lỗi undefined)
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};

// 2. Cấu hình dữ liệu chuẩn
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

// 3. Mapping ứng dụng
const appMapping = {
  'locket': { entitlement: 'Gold', product: 'com.locket.gold.yearly' },
  'ticket': { entitlement: 'vip', product: 'vip+watch_vip' } // Đã đơn giản hóa key cho dễ khớp
};

let activeApp = null;
for (let key in appMapping) {
  if (ua.includes(key)) {
    activeApp = appMapping[key];
    break;
  }
}

// 4. Thực thi ghi đè
if (activeApp) {
  const { entitlement, product } = activeApp;
  entitlementData.product_identifier = product;
  obj.subscriber.subscriptions[product] = subscriptionData;
  obj.subscriber.entitlements[entitlement] = entitlementData;
} else {
  // Mặc định cho các app dùng 'pro'
  const defaultProduct = "com.premium.yearly";
  entitlementData.product_identifier = defaultProduct;
  obj.subscriber.subscriptions[defaultProduct] = subscriptionData;
  obj.subscriber.entitlements["pro"] = entitlementData;
}

$done({ body: JSON.stringify(obj) });
