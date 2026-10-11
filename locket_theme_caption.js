/**
 * Locket Dynamic Overlay & Caption Enhancer
 * Mod linh hoạt màu sắc, gradient và style caption dựa trên payload Locket gốc
 */

let body = $request ? $request.body : $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // Hàm xử lý tùy chỉnh đè lên Overlay có sẵn
        function customizeOverlay(dataObj) {
            if (!dataObj || !Array.isArray(dataObj.overlays)) return;

            dataObj.overlays.forEach(item => {
                // Kiểm tra nếu gói tin chứa caption overlay
                if (item.overlay_type === "caption" && item.data) {
                    
                    // 1. Tự động đổi dải màu Gradient (ví dụ đổi dải màu sang sắc tím/hồng neon)
                    if (item.data.background && item.data.background.colors) {
                        item.data.background.colors = ["#8A2BE2", "#FF1493"]; 
                    }

                    // 2. Tự động chỉnh màu chữ cho nổi bật trên nền gradient
                    item.data.text_color = "#FFFFFF";

                    // 3. (Tùy chọn) Thêm prefix/suffix vào chữ nếu muốn
                    // item.data.text = "✨ " + item.data.text;
                }
            });
        }

        // Kiểm tra đối tượng data nằm ở root hay lồng bên trong
        if (obj.data) {
            customizeOverlay(obj.data);
        } else {
            customizeOverlay(obj);
        }

        let modifiedBody = JSON.stringify(obj);

        // Trả về dữ liệu đã mod
        if ($request) {
            $done({ body: modifiedBody });
        } else {
            $done({ body: modifiedBody });
        }

    } catch (e) {
        console.log("Lỗi parse JSON Locket Overlay: " + e);
        $done({});
    }
} else {
    $done({});
}
