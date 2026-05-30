"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameState";

export default function LandingPage() {
  const router = useRouter();
  const { isLoaded, charName, level, resetEntireGame } = useGame();

  const [isCharacterCreated, setIsCharacterCreated] = React.useState(false);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [onboardingStep, setOnboardingStep] = React.useState(0);

  const ONBOARDING_STEPS = [
    {
      emoji: "👋",
      title: "Chào mừng Bố Mẹ!",
      subtitle: "Hướng dẫn sử dụng game nhanh",
      description: "Level Up Kid biến việc rèn luyện hằng ngày của con thành một trò chơi phiêu lưu RPG. Con làm việc tốt ngoài đời → nhận điểm trong game → đổi phần thưởng thật!",
      tip: "💡 Game hoạt động offline, dữ liệu lưu trên thiết bị này.",
      color: "from-forest to-forest-medium",
    },
    {
      emoji: "🎯",
      title: "Bước 1: Tạo Nhiệm Vụ",
      subtitle: "Phòng Quản Trị Bố Mẹ 🔑",
      description: "Vào mục \"Bố Mẹ\" ở thanh dưới cùng → nhập PIN (mặc định: 1234) → thêm nhiệm vụ hằng ngày cho con như: quét nhà, đọc sách, tập thể dục...",
      tip: "💡 Có sẵn 14 nhiệm vụ mẫu, chỉ cần bấm chọn là thêm ngay!",
      color: "from-forest to-sky",
    },
    {
      emoji: "✅",
      title: "Bước 2: Con Làm Nhiệm Vụ",
      subtitle: "Màn hình Phiêu Lưu 🌳",
      description: "Con mở app → thấy danh sách việc cần làm → làm xong việc ngoài đời thật → bấm tích ✓ hoàn thành → nhận EXP thăng cấp + Điểm ⭐ + Năng Lượng ⚡.",
      tip: "💡 Làm từ 3 việc/ngày sẽ duy trì ngọn lửa Streak 🔥 tăng bonus điểm!",
      color: "from-amber to-terracotta",
    },
    {
      emoji: "⛏️",
      title: "Bước 3: Đào Mỏ Tìm Kho Báu",
      subtitle: "Động Khai Thác ⛏️",
      description: "Năng lượng ⚡ từ nhiệm vụ dùng để đào mỏ. Số xu nhận được phụ thuộc trực tiếp vào Cấp độ, Chuỗi Streak, Chỉ số rèn luyện của con và Cấp thú cưng đi kèm chứ không còn phụ thuộc may rủi ngẫu nhiên!",
      tip: "💡 Thú cưng tự động lớn lên theo nỗ lực rèn luyện tăng chỉ số stats ngoài đời của con!",
      color: "from-amber-dark to-amber",
    },
    {
      emoji: "🎁",
      title: "Bước 4: Đổi Quà Thưởng",
      subtitle: "Cửa hàng Đổi Quà 🛒",
      description: "Con dùng Điểm ⭐ đổi giờ chơi game/TV (bố mẹ tự đặt giá). Dùng Hero Coin 🪙 đổi quà thật (kem, Lego, đồ chơi...). Bố mẹ nhập PIN xác nhận khi con bấm đổi.",
      tip: "💡 Bố mẹ tạo quà ở Phòng Quản Trị, chỉ cần nhập giá VNĐ, game tự tính coin!",
      color: "from-sky to-sky-dark",
    },
    {
      emoji: "🔄",
      title: "Bước 5: Reset Ngày Mới",
      subtitle: "Chu trình hằng ngày",
      description: "Cuối mỗi ngày, bố mẹ vào Phòng Quản Trị → bấm \"Kích hoạt ngày mới\" để reset nhiệm vụ. Nếu con làm tốt ≥3 việc, Streak 🔥 sẽ tăng thêm 1!",
      tip: "💡 PIN mặc định là 1234. Bố mẹ nên đổi PIN ngay trong Phòng Quản Trị nhé!",
      color: "from-clay to-terracotta",
    },
  ];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsCharacterCreated(localStorage.getItem("quocbao_game_state") !== null);
      // Show onboarding if not seen before
      const hasSeenOnboarding = localStorage.getItem("quocbao_onboarding_done");
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("quocbao_onboarding_done", "true");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest"></div>
        <p className="mt-4 text-forest font-medium">Đang tải thế giới phiêu lưu...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow p-6 relative overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[30%] bg-forest-light opacity-60 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] bg-amber-light opacity-50 rounded-full blur-3xl -z-10"></div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center my-auto space-y-6">
        {/* Cute Mascot SVG - Forest Knight Mascot */}
        <div className="w-40 h-40 animate-float relative flex items-center justify-center bg-forest-light border-4 border-forest rounded-full shadow-game-forest">
          <svg className="w-24 h-24 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" fill="#A7F3D0" />
            <circle cx="12" cy="11" r="3" fill="#D97706" />
            <path d="M12 2v20M2 12h20" stroke="#1B5E20" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
          <span className="absolute bottom-[-10px] bg-amber text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-sand-light shadow">
            SUMMER V1
          </span>
        </div>

        {/* Branding & Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-forest tracking-tight uppercase leading-tight drop-shadow-sm">
            Hành Trình Anh Hùng <br />
            <span className="text-amber">{isCharacterCreated && charName ? charName : "levelup Kid"}</span>
          </h1>
          <p className="text-sm font-medium text-forest-dark opacity-90 max-w-xs mx-auto">
            Biến quá trình phát triển bản thân ngoài đời thực thành một trò chơi phiêu lưu kỳ thú!
          </p>
        </div>

        {/* Feature Cards - Flat 3D game style */}
        <div className="grid grid-cols-2 gap-4 w-full pt-4">
          <div className="bg-white border-2 border-sand p-3.5 rounded-2xl shadow-game-flat flex flex-col items-center text-center space-y-1">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xs font-extrabold text-forest-dark uppercase">Nhận Nhiệm Vụ</h3>
            <p className="text-[10px] text-gray-500">Làm việc tốt ngoài đời thật để thăng tiến</p>
          </div>
          <div className="bg-white border-2 border-sand p-3.5 rounded-2xl shadow-game-flat flex flex-col items-center text-center space-y-1">
            <span className="text-2xl">🔥</span>
            <h3 className="text-xs font-extrabold text-forest-dark uppercase">Tích Lũy EXP</h3>
            <p className="text-[10px] text-gray-500">Tăng cấp Chiến Binh, rèn luyện 5 chỉ số</p>
          </div>
          <div className="bg-white border-2 border-sand p-3.5 rounded-2xl shadow-game-flat flex flex-col items-center text-center space-y-1">
            <span className="text-2xl">📺</span>
            <h3 className="text-xs font-extrabold text-forest-dark uppercase">Mở Khóa Quà</h3>
            <p className="text-[10px] text-gray-500">Đổi giờ chơi game & đặc quyền giải trí</p>
          </div>
          <div className="bg-white border-2 border-sand p-3.5 rounded-2xl shadow-game-flat flex flex-col items-center text-center space-y-1">
            <span className="text-2xl">👾</span>
            <h3 className="text-xs font-extrabold text-forest-dark uppercase">Diệt Boss Tuần</h3>
            <p className="text-[10px] text-gray-500">Vượt qua thói quen lười biếng hằng ngày</p>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="mt-8 space-y-3 w-full pb-4">
        {isCharacterCreated ? (
          <>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-forest text-sand-light font-extrabold text-base py-4 px-6 rounded-2xl border-2 border-forest shadow-game-forest btn-game-transition active:shadow-game-pressed"
            >
              TIẾP TỤC HÀNH TRÌNH (CẤP {level}) 🌳
            </button>
            <button
              onClick={() => {
                if (confirm("Con có chắc muốn bắt đầu lại hành trình mới không? Mọi EXP và cấp độ hiện tại sẽ được khởi động lại.")) {
                  resetEntireGame();
                  router.push("/register");
                }
              }}
              className="w-full bg-sand-light text-forest font-bold text-xs py-2.5 px-4 rounded-xl border border-sand hover:bg-sand-dark transition-all"
            >
              Tạo nhân vật mới 🔁
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/register")}
            className="w-full bg-forest text-sand-light font-extrabold text-base py-4 px-6 rounded-2xl border-2 border-forest shadow-game-forest btn-game-transition active:shadow-game-pressed"
          >
            BẮT ĐẦU PHIÊU LƯU 🗡️
          </button>
        )}

        <div className="text-center pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => router.push("/parent")}
            className="text-xs font-bold text-amber hover:underline uppercase tracking-wider"
          >
            🔑 DASHBOARD CHO BỐ MẸ
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => { setOnboardingStep(0); setShowOnboarding(true); }}
            className="text-xs font-bold text-forest hover:underline uppercase tracking-wider"
          >
            📖 HƯỚNG DẪN
          </button>
        </div>
      </div>

      {/* ONBOARDING TUTORIAL MODAL */}
      {showOnboarding && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-5 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden relative">
            
            {/* Gradient Header */}
            <div className={`bg-gradient-to-br ${ONBOARDING_STEPS[onboardingStep].color} p-6 text-white text-center relative overflow-hidden`}>
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-2 animate-bounce">{ONBOARDING_STEPS[onboardingStep].emoji}</div>
                <h3 className="text-lg font-black uppercase tracking-wider">{ONBOARDING_STEPS[onboardingStep].title}</h3>
                <p className="text-xs font-bold opacity-80 mt-0.5">{ONBOARDING_STEPS[onboardingStep].subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-forest-dark font-medium leading-relaxed">
                {ONBOARDING_STEPS[onboardingStep].description}
              </p>
              
              {/* Tip box */}
              <div className="bg-amber-light/40 border border-amber/30 p-3 rounded-xl text-xs font-bold text-amber-dark">
                {ONBOARDING_STEPS[onboardingStep].tip}
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {ONBOARDING_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setOnboardingStep(i)}
                    className={`transition-all duration-200 rounded-full ${
                      i === onboardingStep 
                        ? "w-6 h-2.5 bg-forest" 
                        : i < onboardingStep 
                          ? "w-2.5 h-2.5 bg-forest/40" 
                          : "w-2.5 h-2.5 bg-sand"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-1">
                {onboardingStep > 0 ? (
                  <button
                    onClick={() => setOnboardingStep(onboardingStep - 1)}
                    className="w-1/3 bg-sand-light text-forest-dark font-black text-xs py-3 rounded-xl border-2 border-sand shadow-game-flat btn-game-transition active:shadow-game-pressed"
                  >
                    ← QUAY LẠI
                  </button>
                ) : (
                  <button
                    onClick={handleFinishOnboarding}
                    className="w-1/3 bg-sand-light text-gray-400 font-bold text-xs py-3 rounded-xl border-2 border-sand"
                  >
                    BỎ QUA
                  </button>
                )}

                {onboardingStep < ONBOARDING_STEPS.length - 1 ? (
                  <button
                    onClick={() => setOnboardingStep(onboardingStep + 1)}
                    className="w-2/3 bg-forest text-sand-light font-black text-sm py-3 rounded-xl border-2 border-forest shadow-game-forest btn-game-transition active:shadow-game-pressed"
                  >
                    TIẾP THEO →
                  </button>
                ) : (
                  <button
                    onClick={handleFinishOnboarding}
                    className="w-2/3 bg-amber text-white font-black text-sm py-3 rounded-xl border-2 border-amber shadow-game-amber btn-game-transition active:shadow-game-pressed"
                  >
                    BẮT ĐẦU NGAY! 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
