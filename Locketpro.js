// Ghi đè Firebase Remote Config: Locket Gold + Full Custom Caption & Overlay Themes
if ($response.body) {
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

        // 2. Danh sách ĐẦY ĐỦ Caption Themes & Overlay từ Database Dump
        const fullCustomCaptions = [
            // --- BỘ STATIC CAPTIONS (NHÃN DÁN CƠ BẢN) ---
            { "text": "Đang Slay", "icon": { "type": "emoji", "data": "💅" }, "background": { "colors": ["#FC466B", "#3F5EFB"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Deadline dí", "icon": { "type": "emoji", "data": "🔥" }, "background": { "colors": ["#FF416C", "#FF4B2B"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Cyberpunk", "icon": { "type": "emoji", "data": "⚡" }, "background": { "colors": ["#00F2FE", "#4FACFE"] }, "max_lines": 1, "text_color": "#000000" },
            { "text": "Rich Kid", "icon": { "type": "emoji", "data": "💸" }, "background": { "colors": ["#FFE259", "#FFA751"] }, "max_lines": 1, "text_color": "#1A1A1A" },
            { "text": "Nhớ người yêu", "icon": { "type": "emoji", "data": "❤️" }, "background": { "colors": ["#FF5349", "#EB0C00"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Em bé", "icon": { "type": "emoji", "data": "🥺" }, "background": { "colors": ["#FFAAA6", "#FF85A2"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "2:00 AM", "icon": { "type": "emoji", "data": "🌙" }, "background": { "colors": ["#0F2027", "#203A43"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Hết nước chấm", "icon": { "type": "emoji", "data": "🤤" }, "background": { "colors": ["#56AB2F", "#A8E063"] }, "max_lines": 1, "text_color": "#000000" },
            { "text": "Đỉnh nóc, kịch trần", "icon": { "type": "emoji", "data": "🚀" }, "background": { "colors": ["#8E2DE2", "#4A00E0"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Mãi mận, mãi keo", "icon": { "type": "emoji", "data": "✨" }, "background": { "colors": ["#FF007F", "#FF758C"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Đúng nhận, sai cãi", "icon": { "type": "emoji", "data": "🔮" }, "background": { "colors": ["#6A11CB", "#2575FC"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Ủa alo?", "icon": { "type": "emoji", "data": "📞" }, "background": { "colors": ["#F2994A", "#F2C94C"] }, "max_lines": 1, "text_color": "#000000" },
            { "text": "Ní ơi, cứu ní!", "icon": { "type": "emoji", "data": "🆘" }, "background": { "colors": ["#FF4B2B", "#FF416C"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Ét ô ét!", "icon": { "type": "emoji", "data": "🚨" }, "background": { "colors": ["#ED213A", "#93291E"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Kiếp nạn thứ 82", "icon": { "type": "emoji", "data": "🫠" }, "background": { "colors": ["#4B6CB7", "#182E6D"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Bốc trúng xít rịt", "icon": { "type": "emoji", "data": "💩" }, "background": { "colors": ["#3A6073", "#3A7BD5"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Đi làm công ty không?", "icon": { "type": "emoji", "data": "💼" }, "background": { "colors": ["#2C3E50", "#4CA1AF"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Đọc số tài khoản đi", "icon": { "type": "emoji", "data": "💳" }, "background": { "colors": ["#11998E", "#38EF7D"] }, "max_lines": 1, "text_color": "#FFFFFF" },
            { "text": "Còn cái nịt", "icon": { "type": "emoji", "data": "💸" }, "background": { "colors": ["#F2994A", "#F2C94C"] }, "max_lines": 1, "text_color": "#000000" },
            { "text": "Night Vibes", "icon": { "type": "emoji", "data": "🌌" }, "background": { "colors": ["#0F2027", "#2C5364"] }, "max_lines": 1, "text_color": "#FFFFFF" },

            // --- BỘ OVERLAY CAPTIONS CÓ ID & HIỆU ỨNG (TỪ DATABASE DUMP) ---
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

        // 3. Đọc dữ liệu caption gốc từ Firebase (nếu có)
        let originalCaptions = [];
        if (obj.entries["overlay_status_captions"]) {
            try {
                originalCaptions = JSON.parse(obj.entries["overlay_status_captions"]);
            } catch (e) {}
        }

        // 4. Gộp mảng caption gốc và mảng custom
        const mergedCaptions = [...originalCaptions, ...fullCustomCaptions];

        // 5. Đóng gói lại thành chuỗi JSON gán vào Firebase Remote Config
        obj.entries["overlay_status_captions"] = JSON.stringify(mergedCaptions);

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}
