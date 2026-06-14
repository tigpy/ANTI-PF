import { useEffect } from "react";
import CyberBackground from "./CyberBackground";

const MainLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden relative" style={{ background: "#0B1020" }}>

      {/* ── Live cyber canvas — fixed, behind everything ── */}
      <CyberBackground />

      {/* ── Static ambient glows on top of canvas ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 65%)",
            filter: "blur(100px)",
            transform: "translate(-25%, -25%)",
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(76,201,240,0.035) 0%, transparent 65%)",
            filter: "blur(100px)",
            transform: "translateX(25%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,255,157,0.03) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ── Page content ── */}
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
