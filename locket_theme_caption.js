/**
 * Locket All-In-One Studio Theme & Overlay Modifier
 * Support: Music (Spotify), Weather, Camera Filter (Celebrity), Star Sign
 * Author: VanTruong Dev
 */

let body = $request ? $request.body :$response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        function processOverlays(dataObj) {
            if (!dataObj) return;

            // Nếu chưa có overlays, khởi tạo mảng
            dataObj.overlays = dataObj.overlays || [];

            // 1. Nếu là bài đăng có Overlay từ trước, duyệt qua từng Overlay để sửa
            if (dataObj.overlays.length > 0) {
                dataObj.overlays.forEach(item => {
                    const type = item.overlay_id || item.overlay_type;

                    // CASE A: Music / Spotify Overlay (caption:music)
                    if (type.includes("music")) {
                        item.data.text = item.data.text || "APT. - ROSÉ, Bruno Mars 🎵";
                        item.data.text_color = "#FFFFFFE6";
                        item.data.background = item.data.background || {};
                        item.data.background.material_blur = "ultra_thin";
                        item.data.background.colors = ["#864B303D", "#864B303D"];
                    }

                    // CASE B: Weather Overlay (caption:weather)
                    else if (type.includes("weather")) {
                        item.data.text = "18°C 🧊";
                        item.data.text_color = "#FFFFFF";
                        if (item.data.icon) {
                            item.data.icon.data = "snowflake"; // Icon SF Symbol tuyết rơi
                        }
                        if (item.data.background) {
                            item.data.background.colors = ["#7F00FF", "#E100FF"]; // Gradient tím neon
                        }
                    }

                    // CASE C: Camera Filter / Celebrity Overlay (caption:filter:*)
                    else if (type.includes("filter")) {
                        dataObj.from_celebrity = true;
                        item.data.text = (item.data.text || "PresLee's Nails") + " ✨";
                        item.data.text_color = "#FFFFFF";
                        if (item.data.background) {
                            item.data.background.colors = ["#FF4FA3", "#FFD6E8"]; // Gradient hồng
                        }
                    }

                    // CASE D: Star Sign / Gradient Custom (caption:star_sign)
                    else if (type.includes("star_sign")) {
                        item.data.text_color = "#FFFFFF";
                        if (item.data.background) {
                            item.data.background.colors = ["#8A2BE2", "#FF1493"]; // Gradient tím/hồng
                        }
                    }
                });
            } 
            // 2. Nếu là bài đăng thường không có Overlay, tự bơm 1 Custom Gradient Overlay mẫu
            else {
                dataObj.overlays.push({
                    "overlay_id": "caption:star_sign",
                    "overlay_type": "caption",
                    "alt_text": "Custom Studio Theme",
                    "data": {
                        "text": "VanTruong Custom Studio ✨",
                        "type": "star_sign",
                        "text_color": "#FFFFFF",
                        "max_lines": {
                            "value": "1",
                            "@type": "type.googleapis.com/google.protobuf.Int64Value"
                        },
                        "background": {
                            "colors": ["#8A2BE2", "#FF1493"],
                            "image": {
                                "type": "image",
                                "data": "star_sign_background",
                                "source": "local"
                            }
                        }
                    }
                });
            }
        }

        // Xử lý dữ liệu nằm ở root hoặc nằm trong field `data` / `result.data`
        if (obj.data) {
            processOverlays(obj.data);
        } else if (obj.result && Array.isArray(obj.result.data)) {
            obj.result.data.forEach(item => processOverlays(item));
        } else {
            processOverlays(obj);
        }

        let modifiedBody = JSON.stringify(obj);

        if ($request) {$done({ body: modifiedBody });
        } else {
            $done({ body: modifiedBody });
        }

    } catch (e) {
        console.log("Lỗi parse Locket All-In-One Script: " + e);
        $done({});
    }
} else {
    $done({});
}
