/**
 * Locket Production-Grade Dynamic Overlay & Theme Modifier
 * Target endpoints: /v1/moments, /v1/moments/*
 */

(function () {
    // 1. Kiểm tra an toàn cho gói tin
    const isRequest = typeof $request !== "undefined";
    const rawBody = isRequest ? $request.body : $response.body;

    if (!rawBody) {
        $done({});
        return;
    }

    try {
        let obj = JSON.parse(rawBody);

        // 2. Core Handler: Xử lý đúng theo từng loại Schema
        function processMomentData(moment) {
            if (!moment || typeof moment !== "object") return;

            // Đảm bảo mảng overlays tồn tại
            if (!Array.isArray(moment.overlays) || moment.overlays.length === 0) {
                return;
            }

            moment.overlays.forEach((item) => {
                if (!item || !item.data) return;

                const overlayId = item.overlay_id || "";
                const overlayType = item.overlay_type || "";

                // === CASE 1: MUSIC / SPOTIFY OVERLAY (caption:music) ===
                if (overlayId.includes("music") || overlayType.includes("music")) {
                    item.data.type = "music";
                    // Tự động giữ màu chữ & độ mờ nền mỏng ultra_thin
                    item.data.text_color = "#FFFFFFE6";
                    if (item.data.background) {
                        item.data.background.material_blur = "ultra_thin";
                        // Cho phép ghi đè dải màu mờ nếu cần
                        item.data.background.colors = item.data.background.colors || ["#864B303D", "#864B303D"];
                    }
                }

                // === CASE 2: WEATHER OVERLAY (caption:weather) ===
                else if (overlayId.includes("weather") || overlayType.includes("weather")) {
                    item.data.type = "weather";
                    item.data.text_color = "#FFFFFF";

                    // Chỉnh dải màu Gradient thời tiết (mặc định tím/hồng neon)
                    if (item.data.background) {
                        item.data.background.colors = ["#7F00FF", "#E100FF"];
                    }

                    // Đổi icon SF Symbol iOS
                    if (item.data.icon) {
                        item.data.icon.type = "sf_symbol";
                        item.data.icon.data = "snowflake"; // Hoặc "sun.max.fill", "cloud.rain.fill"
                        item.data.icon.color = "#FFFFFF";
                    }
                }

                // === CASE 3: CAMERA FILTER / CELEBRITY OVERLAY (caption:filter:*) ===
                else if (overlayId.includes("filter") || overlayType.includes("filter")) {
                    moment.from_celebrity = true;
                    item.data.type = "camera_filter";
                    item.data.text_color = "#FFFFFF";

                    if (item.data.background) {
                        item.data.background.colors = ["#FF4FA3", "#FFD6E8"]; // Tông hồng Celebrity
                    }
                }

                // === CASE 4: STAR SIGN / CUSTOM GRADIENT OVERLAY (caption:star_sign) ===
                else if (overlayId.includes("star_sign") || overlayType.includes("star_sign")) {
                    item.data.type = "star_sign";
                    item.data.text_color = "#FFFFFF";

                    if (item.data.background) {
                        // Độ dải màu Gradient custom đẹp mắt
                        item.data.background.colors = ["#8A2BE2", "#FF1493"];
                    }
                }
            });
        }

        // 3. Router: Điểm vào dữ liệu linh hoạt (Root, data, hoặc result.data)
        if (obj.data) {
            processMomentData(obj.data);
        } else if (obj.result && Array.isArray(obj.result.data)) {
            obj.result.data.forEach((m) => processMomentData(m));
        } else if (Array.isArray(obj)) {
            obj.forEach((m) => processMomentData(m));
        } else {
            processMomentData(obj);
        }

        // 4. Trả kết quả sạch về cho Shadowrocket
        const finalBody = JSON.stringify(obj);
        $done(isRequest ? { body: finalBody } : { body: finalBody });

    } catch (err) {
        // Nếu lỗi parse JSON (do gói tin mã hoá khác), giữ nguyên gói tin gốc không làm crash App
        console.log("Locket Script Safe Catch: " + err);
        $done({});
    }
})();
}
