// Ghi đè Firebase Remote Config: Locket Gold + Full Custom Caption & Overlay Themes
if ($response &&$response.body) {
    try {
        let obj = JSON.parse($response.body);
        if (!obj.entries) {
            obj.entries = {};
        }

        // 1. Kích hoạt toàn bộ Feature Flags & Premium
        const featureFlags = {
            "purchases_entitlementGold": "true",
            "gold_membership_card": "true",
            "show_gold_badge": "true",
            "app_icon_picker": "true",
            "camera_roll": "true",
            "locket_views": "true",
            "video_max_duration": "30",
            "caption_themes_enabled": "true",
            "custom_captions_enabled": "true",
            "text_styles_enabled": "true",
            "gold_caption_themes": "true",
            "badge_caption_enabled": "true",
            "overlay_captions": "true",
            "stickers_enabled": "true",
            "gold_stickers_enabled": "true",
            "widget_frame_event": "true"
        };
        Object.assign(obj.entries, featureFlags);

        // 2. Danh sách Caption đã được Chuẩn hóa Cấu trúc
        const customCaptionsRaw = [
            // --- BỘ STATIC CAPTIONS ---
            { text: "Đang Slay", emoji: "💅", colors: ["#FC466B", "#3F5EFB"], textColor: "#FFFFFF" },
            { text: "Deadline dí", emoji: "🔥", colors: ["#FF416C", "#FF4B2B"], textColor: "#FFFFFF" },
            { text: "Cyberpunk", emoji: "⚡", colors: ["#00F2FE", "#4FACFE"], textColor: "#000000" },
            { text: "Rich Kid", emoji: "💸", colors: ["#FFE259", "#FFA751"], textColor: "#1A1A1A" },
            { text: "Nhớ người yêu", emoji: "❤️", colors: ["#FF5349", "#EB0C00"], textColor: "#FFFFFF" },
            { text: "Em bé", emoji: "🥺", colors: ["#FFAAA6", "#FF85A2"], textColor: "#FFFFFF" },
            { text: "2:00 AM", emoji: "🌙", colors: ["#0F2027", "#203A43"], textColor: "#FFFFFF" },
            { text: "Hết nước chấm", emoji: "🤤", colors: ["#56AB2F", "#A8E063"], textColor: "#000000" },
            { text: "Đỉnh nóc, kịch trần", emoji: "🚀", colors: ["#8E2DE2", "#4A00E0"], textColor: "#FFFFFF" },
            { text: "Mãi mận, mãi keo", emoji: "✨", colors: ["#FF007F", "#FF758C"], textColor: "#FFFFFF" },
            { text: "Đúng nhận, sai cãi", emoji: "🔮", colors: ["#6A11CB", "#2575FC"], textColor: "#FFFFFF" },
            { text: "Ủa alo?", emoji: "📞", colors: ["#F2994A", "#F2C94C"], textColor: "#000000" },
            { text: "Ní ơi, cứu ní!", emoji: "🆘", colors: ["#FF4B2B", "#FF416C"], textColor: "#FFFFFF" },
            { text: "Ét ô ét!", emoji: "🚨", colors: ["#ED213A", "#93291E"], textColor: "#FFFFFF" },
            { text: "Kiếp nạn thứ 82", emoji: "🫠", colors: ["#4B6CB7", "#182E6D"], textColor: "#FFFFFF" },
            { text: "Bốc trúng xít rịt", emoji: "💩", colors: ["#3A6073", "#3A7BD5"], textColor: "#FFFFFF" },
            { text: "Đi làm công ty không?", emoji: "💼", colors: ["#2C3E50", "#4CA1AF"], textColor: "#FFFFFF" },
            { text: "Đọc số tài khoản đi", emoji: "💳", colors: ["#11998E", "#38EF7D"], textColor: "#FFFFFF" },
            { text: "Còn cái nịt", emoji: "💸", colors: ["#F2994A", "#F2C94C"], textColor: "#000000" },
            { text: "Night Vibes", emoji: "🌌", colors: ["#0F2027", "#2C5364"], textColor: "#FFFFFF" }
        ];

        // Tự động chuyển đổi Static Captions sang đúng chuẩn Schema của Locket
        const formattedStaticCaptions = customCaptionsRaw.map((item, idx) => ({
            "overlay_id": `caption:custom_static_${idx}`,
            "source": "remote",
            "caption": {
                "type": "static_content",
                "max_lines": 1,
                "text": item.text,
                "text_color": item.textColor,
                "icon": { "type": "emoji", "data": item.emoji },
                "background": { "colors": item.colors }
            }
        }));

        // Bộ Overlay Captions đặc biệt (giữ nguyên schema)
        const overlayCaptions = [
            {
                "overlay_id": "caption:thao_ma_lai_hay",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Thà làm ma dại hay hơn",
                    "text_color": "#FFFFFF",
                    "icon": { "type": "emoji", "data": "👻" },
                    "background": { "colors": ["#4B3832", "#854442"] }
                }
            },
            {
                "overlay_id": "caption:ve_ke_khong_ai_tin",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Vẽ kế không ai tin",
                    "text_color": "#FFFFFF",
                    "icon": { "type": "emoji", "data": "🎨" },
                    "background": { "colors": ["#0F2027", "#2C5364"] }
                }
            },
            {
                "overlay_id": "caption:hoi_chieu_troi_mua",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Hồi chiều trời mưa",
                    "text_color": "#FFFFFF",
                    "icon": { "type": "emoji", "data": "🌧️" },
                    "background": { "colors": ["#3a7bd5", "#3a6073"], "material_blur": "ultra_thick" },
                    "effect": "snow"
                }
            },
            {
                "overlay_id": "caption:huong_noi_het_doi",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Hướng nội hết phần đời còn lại",
                    "text_color": "#E2E8F0",
                    "icon": { "type": "emoji", "data": "🧘" },
                    "background": { "colors": ["#191654", "#43C6AC"] }
                }
            },
            {
                "overlay_id": "caption:suy_nghi_tich_cuc",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Suy nghĩ tích cực",
                    "text_color": "#FFFFFF",
                    "icon": { "type": "emoji", "data": "✨" },
                    "background": { "colors": ["#11998E", "#38EF7D"] }
                }
            },
            {
                "overlay_id": "caption:chua_muon_noi",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Chưa muốn nói",
                    "text_color": "#FFFFFF",
                    "icon": { "type": "emoji", "data": "🤫" },
                    "background": { "colors": ["#355C7D", "#D76D77"] }
                }
            },
            {
                "overlay_id": "caption:nhiem_vu_he_thong",
                "source": "remote",
                "caption": {
                    "type": "static_content",
                    "max_lines": 1,
                    "text": "Nhiệm vụ hệ thống",
                    "text_color": "#FFFFFF",
                    "icon": { "type": "emoji", "data": "🤖" },
                    "background": { "colors": ["#141E30", "#243B55"] }
                }
            }
        ];

        // 3. Đọc dữ liệu caption gốc từ Firebase
        let originalCaptions = [];
        if (obj.entries["overlay_status_captions"]) {
            try {
                originalCaptions = JSON.parse(obj.entries["overlay_status_captions"]);
            } catch (e) {}
        }

        // 4. Gộp mảng và Lọc trùng lặp theo `overlay_id`
        const fullCustomList = [...formattedStaticCaptions, ...overlayCaptions];
        const captionMap = new Map();

        // Đưa mảng gốc vào Map trước
        if (Array.isArray(originalCaptions)) {
            originalCaptions.forEach(item => {
                if (item && item.overlay_id) captionMap.set(item.overlay_id, item);
            });
        }
        // Thêm mảng Custom vào Map (ghi đè nếu trùng ID)
        fullCustomList.forEach(item => {
            if (item && item.overlay_id) captionMap.set(item.overlay_id, item);
        });

        const mergedCaptions = Array.from(captionMap.values());

        // 5. Đóng gói lại thành chuỗi JSON gán vào Firebase Remote Config
        obj.entries["overlay_status_captions"] = JSON.stringify(mergedCaptions);

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // An toàn: Trả lại response gốc nếu có lỗi parse
        $done({ body:$response.body });
    }
} else {
    $done({});
}
