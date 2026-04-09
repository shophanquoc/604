import "../Styles.css";

export default function Hero() {
  return (
    <div className="hero-bg" style={{ padding: "60px 20px", textAlign: "center" }}>
      
      {/* BADGE */}
      <div
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "20px",
          background: "#ffe5e5",
          color: "#d50000",
          marginBottom: 20,
          fontWeight: 500
        }}
      >
        🎖️ Thành lập năm 1975
      </div>

      {/* TITLE */}
      <div className="title-main">
        Lịch sử Hình thành <br />
        <span className="title-highlight">& Phát triển</span>
      </div>

      {/* DESC */}
      <p className="hero-desc" style={{ maxWidth: 500, margin: "20px auto" }}>
        Trang thông tin lưu trữ các sự kiện lịch sử, quá trình hình thành,
        phát triển và những chiến công của Lữ đoàn Thông tin 604.
      </p>

      {/* BUTTON */}
      <button
        className="btn-primary"
        onClick={() =>
          window.scrollTo({
            top: 500,
            behavior: "smooth"
          })
        }
      >
        Khám phá Tư liệu →
      </button>

    </div>
  );
}