import { useState, useEffect } from "react";
import CyberBackground from "./CyberBackground";
import { CustomCursor } from "../components/common";
import BootLoader from "../components/common/BootLoader";
import GlitchOverlay from "../components/common/GlitchOverlay";
import PacketSnifferTicker from "../components/common/PacketSnifferTicker";
import { addSnifferLog } from "../utils/sniffer";
import { safeSessionStorage } from "../utils/storage";
import { cyberSynth } from "../utils/synth";

const MainLayout = ({ children }) => {
  const [bootComplete, setBootComplete] = useState(
    safeSessionStorage.getItem('cyber_booted') === 'true'
  );
  const [destructCountdown, setDestructCountdown] = useState(null);
  const [isDestructed, setIsDestructed] = useState(false);
  const [showFailureScreen, setShowFailureScreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track scroll events and log them to sniffer (throttled)
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const scrolledPercent = Math.round((window.scrollY / docHeight) * 100);
        addSnifferLog(`[SYS] SCROLL: SYSTEM CACHE INDEXED ${scrolledPercent}%`);
      }, 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Lock body scroll during BIOS sequence
  useEffect(() => {
    if (!bootComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [bootComplete]);

  // Self-Destruct trigger and restore listener
  useEffect(() => {
    const handleTrigger = () => {
      if (destructCountdown !== null || isDestructed) return;
      setDestructCountdown(3);
    };

    const handleRestore = () => {
      const sheets = document.querySelectorAll('[data-self-destruct-disabled="true"]');
      sheets.forEach(sheet => {
        sheet.removeAttribute('data-self-destruct-disabled');
        sheet.disabled = false;
      });
      setIsDestructed(false);
      setDestructCountdown(null);
      addSnifferLog('[SYS] RECOVERY COMPLETED: STYLE TEMPLATES RESTORED');
      cyberSynth.playChime();
    };

    window.addEventListener('trigger-self-destruct', handleTrigger);
    window.addEventListener('restore-self-destruct', handleRestore);
    return () => {
      window.removeEventListener('trigger-self-destruct', handleTrigger);
      window.removeEventListener('restore-self-destruct', handleRestore);
    };
  }, [destructCountdown, isDestructed]);

  // Countdown timer loop
  useEffect(() => {
    if (destructCountdown === null) return;

    if (destructCountdown > 0) {
      cyberSynth.playBeep();
      addSnifferLog(`[WARNING] SYSTEM DESTRUCTION COUNTDOWN: ${destructCountdown}`);
      const timer = setTimeout(() => {
        setDestructCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setDestructCountdown(null);
      cyberSynth.playExplosion();
      addSnifferLog('[CRITICAL] DESTRUCT CORE COLLAPSE: INITIATING COLLAPSE SCREEN');
      setShowFailureScreen(true);
    }
  }, [destructCountdown]);

  // Failure overlay screen timer
  useEffect(() => {
    if (!showFailureScreen) return;

    const timer = setTimeout(() => {
      setShowFailureScreen(false);
      setIsDestructed(true);
      addSnifferLog('[CRITICAL] DESTRUCT SEQUENCE COMPLETED. ALL STYLES DELETED.');

      // Disable all styles in document.head
      const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
      styles.forEach(style => {
        style.setAttribute('data-self-destruct-disabled', 'true');
        style.disabled = true;
      });

      // Dispatch event to set CLIOverlay into destruct state, but do NOT force open it!
      window.dispatchEvent(new CustomEvent('set-cli-destruct-mode'));
    }, 1800);

    return () => clearTimeout(timer);
  }, [showFailureScreen]);

  let containerClassName = "min-h-screen w-full overflow-x-hidden relative";
  if (destructCountdown !== null) {
    containerClassName += " animate-shake animate-flash-red";
  }

  return (
    <div className={containerClassName} style={{ background: "var(--bg-primary)" }}>
      {/* ── BIOS Bootloader sequence ── */}
      {!bootComplete && (
        <BootLoader onComplete={() => setBootComplete(true)} />
      )}

      {/* ── Custom Hacker Cursor ── */}
      <CustomCursor />

      {/* ── Intrusion detector glitch overlay ── */}
      <GlitchOverlay />

      {/* ── Floating simulated packet activity logs ticker ── */}
      <PacketSnifferTicker />

      {/* ── Live cyber canvas — fixed, behind everything ── */}
      <CyberBackground />

      {/* ── Static ambient glows on top of canvas ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(30,111,68,0.05) 0%, rgba(30,111,68,0.02) 40%, rgba(30,111,68,0.005) 70%, transparent 100%)",
            transform: "translate(-25%, -25%)",
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(194,94,41,0.04) 0%, rgba(194,94,41,0.015) 45%, rgba(194,94,41,0.003) 70%, transparent 100%)",
            transform: "translateX(25%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(43,98,130,0.04) 0%, rgba(43,98,130,0.015) 45%, rgba(43,98,130,0.003) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Page content (hidden under opacity until booted) ── */}
      <div 
        className={`relative transition-opacity duration-700 ease-in-out`} 
        style={{ zIndex: 2, opacity: bootComplete ? 1 : 0 }}
      >
        {children}
      </div>

      {/* ── Movie-style System Failure Overlay ── */}
      {showFailureScreen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0a0000',
          color: '#C25E29',
          fontFamily: 'monospace',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
          textAlign: 'center',
          border: '10px double #C25E29',
          boxSizing: 'border-box'
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#C25E29',
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(194,94,41,0.5)'
          }}>
            ⚠️ FATAL SYSTEM ERROR ⚠️
          </div>
          <div style={{ 
            fontSize: '13px', 
            lineHeight: '1.6', 
            maxWidth: '600px', 
            margin: '0 auto', 
            textAlign: 'left', 
            border: '1px dashed #C25E29', 
            padding: '20px', 
            backgroundColor: '#140000',
            boxShadow: '0 0 20px rgba(194,94,41,0.2)'
          }}>
            <p style={{ margin: '0 0 10px 0', color: '#FAF9F6' }}><strong>[CRITICAL]</strong> STYLESHEET ENGINE TERMINATED BY SELF-DESTRUCT CODE.</p>
            <p style={{ margin: '0 0 10px 0' }}><strong>ERROR_CODE:</strong> 0xDE5780C7 (DESTRUCT_SUCCESS)</p>
            <p style={{ margin: '0 0 10px 0' }}><strong>FALLBACK SYSTEM:</strong> RAW HTML CORE MOUNTED.</p>
            <p style={{ margin: '0 0 20px 0', color: '#1E6F44' }}><strong>DIAGNOSTICS:</strong> SYSTEM TERMINALS OFFLINE. BACKUP COMMAND SHELL DETECTED.</p>
            <p style={{ margin: '0', color: '#8C908D', fontSize: '11px', textAlign: 'center' }}>CRASH LOG COMMITTED. REMOVING INTERFACE LAYER...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
