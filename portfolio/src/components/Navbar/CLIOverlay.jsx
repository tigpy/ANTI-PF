import React, { useState, useEffect, useRef } from 'react';
import { cyberSynth } from '../../utils/synth';
import { addSnifferLog } from '../../utils/sniffer';
import Oscilloscope from '../common/Oscilloscope';

export default function CLIOverlay({ isOpen, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    '==================================================',
    ' ANTI-PF SECURE SYSTEM PROTOCOL v4.3.0',
    '==================================================',
    ' STATUS: CORE ENCRYPTED -> SYSTEM FIREWALL ACTIVE',
    ' TASK: FIND 2 HIDDEN KEY SHARDS TO BYPASS SYSTEM:',
    '   * Shard 1: Embedded as an HTML comment in index.html',
    '   * Shard 2: Embedded in browser cookie ("sec_flag")',
    ' SUBMIT KEY: Type: flag FLAG{shard1_shard2}',
    '--------------------------------------------------',
    ' TYPE "ctf" FOR DETAILED HINTS. TYPE "help" FOR COMMANDS.',
    ''
  ]);
  const [ctfUnlocked, setCtfUnlocked] = useState(false);
  const [isDestructMode, setIsDestructMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const checkResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkResize();
    window.addEventListener('resize', checkResize);
    return () => window.removeEventListener('resize', checkResize);
  }, []);

  // Listen for self-destruct activations
  useEffect(() => {
    const onDestruct = () => {
      setIsDestructMode(true);
      setTerminalLogs(prev => [
        ...prev,
        '==================================================',
        ' !!! CRITICAL SYSTEM CORRUPTION DETECTED !!!',
        '==================================================',
        ' ERROR: STYLESHEET ENGINES HAVE BEEN FORCE DELETED.',
        ' WARNING: RENDERED LAYOUTS ARE SHATTERED.',
        ' COMMAND: Type "fix" or "reconstruct" to rebuild styles.',
        '--------------------------------------------------',
        ''
      ]);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    };

    const onRestore = () => {
      setIsDestructMode(false);
      setTerminalLogs(prev => [
        ...prev,
        '>> INITIATING CORE RESTORE SEQUENCE...',
        '>> RE-MOUNTING STYLESHEETS...',
        '>> STATUS: [SUCCESS] ALL STYLE TEMPLATES ACTIVE.',
        ''
      ]);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    };

    window.addEventListener('set-cli-destruct-mode', onDestruct);
    window.addEventListener('restore-self-destruct', onRestore);
    return () => {
      window.removeEventListener('set-cli-destruct-mode', onDestruct);
      window.removeEventListener('restore-self-destruct', onRestore);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    let timer;
    if (isOpen && inputRef.current) {
      timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
      cyberSynth.playBoot();
      addSnifferLog('[CLI] TERMINAL SHELL ACTIVATED');
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  // Handle command execution
  const executeCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    addSnifferLog(`[CLI] COMMAND SUBMITTED: ${trimmed}`);
    cyberSynth.playChime();

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const newLogs = [...terminalLogs, `$ ${cmdText}`];

    switch (command) {
      case 'help':
      case '?':
        newLogs.push(
          'AVAILABLE COMMANDS:',
          '  about       - Scroll to About section',
          '  skills      - Scroll to Skills section',
          '  projects    - Scroll to Projects section',
          '  contact     - Scroll to Contact form',
          '  ctf         - Print Capture the Flag clues',
          '  flag [key]  - Submit a CTF flag value',
          '  destruct    - Trigger self-destruct countdown',
          '  fix         - Rebuild corrupted style assets',
          '  clear / cls - Clear terminal logs',
          '  exit        - Close diagnostic shell'
        );
        break;

      case 'about':
      case 'skills':
      case 'projects':
      case 'contact':
        if (isDestructMode) {
          newLogs.push('[ERROR] DECOMMISSIONED. RESTORE THE STYLE SYSTEM TO USE NAVIGATION.');
        } else {
          const element = document.getElementById(command);
          if (element) {
            newLogs.push(`SCROLLING TO ${command.toUpperCase()} FEATURE AREA...`);
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
            }, 300);
            onClose();
          } else {
            newLogs.push(`[ERROR] ELEMENT #${command} NOT FOUND IN DOM.`);
          }
        }
        break;

      case 'ctf':
        newLogs.push(
          'CAPTURE THE FLAG SYSTEM:',
          '  Clue 1: A piece of the key is hidden as an HTML comment in index.html.',
          '  Clue 2: The second half of the key is inside your browser cookies as "sec_flag".',
          '  Combine them and submit with: flag FLAG{firsthalf_secondhalf}'
        );
        break;

      case 'flag':
        if (!arg) {
          newLogs.push('[ERROR] NO FLAG SUBMITTED. FORMAT: flag FLAG{...}');
        } else if (arg === 'FLAG{4RY4N_S1NGH_R00T_BYP455}') {
          newLogs.push('CRYPTOGRAPHIC KEY IDENTIFIED. DECRYPTING PRIVILEGED MEMORY...');
          setTimeout(() => {
            setCtfUnlocked(true);
            cyberSynth.playAlarm();
            addSnifferLog('[SUCCESS] CTF CHALLENGE SOLVED: ACCESS GRANTED');
          }, 600);
        } else {
          newLogs.push('[ERROR] CRYPTOGRAPHIC SIGNATURE MISMATCH. ACCESS DENIED.');
        }
        break;

      case 'destruct':
      case 'self-destruct':
        newLogs.push(
          'INITIATING CORE DESTRUCTION PROTOCOL...',
          'WARNING: 3 SECONDS TO CORE COLLAPSE.'
        );
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('trigger-self-destruct'));
        }, 300);
        break;

      case 'reconstruct':
      case 'fix':
        if (isDestructMode) {
          newLogs.push('RECOVERY SIGNAL BROADCASTED. ATTEMPTING STYLE SYSTEM REBOOT...');
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('restore-self-destruct'));
          }, 300);
        } else {
          newLogs.push('SYSTEM HEALTHY. CORE STYLES ACTIVE. NO ACTION REQUIRED.');
        }
        break;

      case 'clear':
      case 'cls':
        setTerminalLogs(['[SCREEN CLEARED]']);
        return;

      case 'exit':
      case 'close':
        if (isDestructMode) {
          newLogs.push('[ERROR] TERMINATION BLOCKED. RESTORE THE STYLE ENGINE FIRST.');
        } else {
          onClose();
        }
        return;

      default:
        newLogs.push(`[ERROR] COMMAND NOT RECOGNIZED: "${command}". TYPE "help" FOR OPTIONS.`);
    }

    setTerminalLogs(newLogs);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  // Auto scroll logs
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  // ESC key listener to close CLI
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 99999,
    height: isMobile ? '70vh' : '55vh',
    maxHeight: isMobile ? 'none' : '550px',
    borderBottom: isDestructMode ? '4px solid #C25E29' : '2px solid var(--border)',
    backgroundColor: 'var(--bg-primary)',
    boxShadow: '0px 10px 30px rgba(24,26,27,0.15)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    fontFamily: 'monospace',
    fontSize: isMobile ? '11px' : '12px',
    color: 'var(--text-primary)'
  };

  const titleBarStyle = {
    backgroundColor: isDestructMode ? '#C25E29' : 'var(--text-primary)',
    color: 'var(--bg-tertiary)',
    padding: isMobile ? '8px 12px' : '8px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    fontSize: isMobile ? '10px' : '12px'
  };

  const panelContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    overflow: 'hidden',
    padding: isMobile ? '8px' : '16px',
    gap: isMobile ? '8px' : '16px',
    zIndex: 10
  };

  const logsPanelStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: isMobile ? '8px' : '12px',
    boxShadow: isMobile ? '1.5px 1.5px 0px var(--border)' : '2.5px 2.5px 0px var(--border)',
    overflow: 'hidden'
  };

  const scrollContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '8px',
    fontFamily: 'monospace'
  };

  const formStyle = {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(24,26,27,0.1)',
    display: 'flex',
    alignItems: 'center'
  };

  const inputStyle = {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontFamily: 'monospace',
    fontSize: '12px'
  };

  const oscPanelStyle = {
    display: isMobile ? 'none' : 'flex',
    width: '320px',
    flexDirection: 'column',
    gap: '8px'
  };

  const infoBoxStyle = {
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg-secondary)',
    padding: '10px',
    fontSize: '10px',
    boxShadow: '2.5px 2.5px 0px var(--border)'
  };

  const ctfLayerStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'var(--text-primary)',
    color: '#1E6F44',
    fontFamily: 'monospace',
    zIndex: 100001,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: isMobile ? '24px 16px' : '48px',
    overflowY: 'auto',
    boxSizing: 'border-box'
  };

  const ctfContentContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: '24px'
  };

  return (
    <div style={overlayStyle}>
      {/* Scanline CRT style overlay */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[size:100%_4px] z-20" 
        style={{ position: 'absolute', pointerEvents: 'none', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 }}
      />

      {/* Terminal Title Bar */}
      <div style={titleBarStyle}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            className="w-2 h-2 rounded-full bg-[#1E6F44] animate-ping" 
            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isDestructMode ? '#C25E29' : '#1E6F44' }}
          />
          {isDestructMode ? (isMobile ? '[RECOVERY_CLI]' : '[CRITICAL_SYSTEM_RECOVERY_CONSOLE]') : (isMobile ? '[SYS_CLI_DIAG]' : '[SYS_TERMINAL_DIAGNOSTICS]')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!isDestructMode && (
            <button
              onClick={() => {
                if (confirm("WARNING: Initiating core collapse will destroy style templates! Proceed?")) {
                  window.dispatchEvent(new CustomEvent('trigger-self-destruct'));
                }
              }}
              style={{
                backgroundColor: '#181A1B',
                color: '#C25E29',
                border: '1px solid #C25E29',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontSize: '10px'
              }}
            >
              ⚠️ DESTRUCT
            </button>
          )}

          <button 
            onClick={isDestructMode ? () => window.dispatchEvent(new CustomEvent('restore-self-destruct')) : onClose}
            style={{
              color: '#FAF9F6',
              backgroundColor: 'transparent',
              border: '1px solid rgba(250,249,246,0.3)',
              borderRadius: '4px',
              padding: '2px 8px',
              cursor: 'pointer',
              fontSize: '10px',
              fontFamily: 'monospace'
            }}
          >
            {isDestructMode ? 'RESTORE SYSTEM [fix]' : 'ESC to Close [X]'}
          </button>
        </div>
      </div>

      {/* Core Dual Panel Layout */}
      <div style={panelContainerStyle}>
        {/* Terminal Logs Panel */}
        <div style={logsPanelStyle}>
          <div ref={scrollContainerRef} style={scrollContainerStyle}>
            {terminalLogs.map((log, index) => {
              let itemStyle = { fontFamily: 'monospace', fontSize: '11px', marginBottom: '4px' };
              if (log.startsWith('$')) {
                itemStyle.color = '#2B6282'; // blueprint blue
                itemStyle.fontWeight = 'bold';
              } else if (log.includes('[ERROR]') || log.includes('!!!') || log.includes('CRITICAL') || log.includes('WARNING')) {
                itemStyle.color = '#C25E29'; // orange warn
                itemStyle.fontWeight = 'bold';
              } else if (log.includes('AVAILABLE') || log.includes('SUCCESS') || log.includes('RECOVERY') || log.includes('ACTIVE')) {
                itemStyle.color = '#1E6F44'; // green success
                itemStyle.fontWeight = 'bold';
              } else {
                itemStyle.color = '#181A1B';
              }
              return (
                <div key={index} style={itemStyle}>
                  {log}
                </div>
              );
            })}
          </div>

          {/* Form Command input */}
          <form onSubmit={handleFormSubmit} style={formStyle}>
            <span style={{ color: '#1E6F44', fontWeight: 'bold', marginRight: '8px', fontFamily: 'monospace' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              style={inputStyle}
              placeholder={isDestructMode ? "type 'fix' or 'reconstruct' to recover style assets..." : "type commands here..."}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          </form>
        </div>

        {/* Oscilloscope Panel (Hidden on Mobile) */}
        <div style={oscPanelStyle}>
          <div style={{ flex: 1, minHeight: '150px', display: 'flex', flexDirection: 'column' }}>
            <Oscilloscope className="w-full h-full shadow-[2.5px_2.5px_0px_#181A1B]" />
          </div>
          <div style={infoBoxStyle}>
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid rgba(24,26,27,0.2)', paddingBottom: '4px', marginBottom: '6px', color: '#2B6282' }}>[WAVEFORM DIAGNOSTIC READOUT]</div>
            <div>STATUS: {isDestructMode ? 'CRITICAL_ALERT' : 'ONLINE'}</div>
            <div>SAMPLE_RATE: 44.1kHz</div>
            <div>FREQUENCY: INTERACTIVE MODULATION</div>
            <div style={{ color: isDestructMode ? '#C25E29' : '#1E6F44', fontWeight: 'bold' }}>TRIGGER: {isDestructMode ? 'SYS_CORRUPTION' : 'MOUSE_MOVE_COORDS'}</div>
          </div>
        </div>
      </div>

      {/* Full-screen Congratulatory CTF Decrypt Layer */}
      {ctfUnlocked && (
        <div style={ctfLayerStyle}>
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] z-20" />
          
          <div style={ctfContentContainerStyle}>
            {/* ASCII Banner */}
            <pre 
              style={{
                fontSize: isMobile ? '4.5px' : '9px',
                lineHeight: '1.2',
                userSelect: 'none',
                overflowX: 'auto',
                maxWidth: '100%',
                textAlign: 'center',
                margin: '0 auto',
                whiteSpace: 'pre'
              }}
            >
{`
  _    ____ ____ _____ ____ ____     ____ ____   _    _   _ _____ _____ ____  
 / \\  / ___/ ___| ____/ ___/ ___|   / ___|  _ \\ / \\  | \\ | |_   _| ____|  _ \\ 
/ _ \\| |  | |   |  _| \\___ \\___ \\  | |  _| |_) / _ \\ |  \\| | | | |  _| | | | |
/ ___ \\ |__| |___| |___ ___) |___) | | |_|  _ / ___ \\| |\\  | | | | |___| |_| |
/_/   \\_\\____\\____|_____|____/____/   \\____|_| \\_/_/   \\_\\_| \\_| |_| |_____|____/ 
`}
            </pre>

            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxWidth: '450px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '4px solid #1E6F44',
                padding: isMobile ? '16px' : '24px',
                boxShadow: '8px 8px 0px #1E6F44',
                textAlign: 'left'
              }}
            >
              <h3 style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: 'bold', letterSpacing: '0.1em', margin: 0, textAlign: 'center' }}>[ PUZZLE DECIPHERED ]</h3>
              <p style={{ fontSize: '11px', lineHeight: '1.5', margin: 0 }}>
                Congratulations! You successfully hacked into the matrix, located the hidden shards in the source comments and cookie vectors, and bypassed our firewall.
              </p>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#1E6F44', marginTop: '8px' }}>
                STATUS: MASTER SYSTEM BYPASS GRANTED
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              onClick={() => {
                setCtfUnlocked(false);
                onClose();
              }}
              style={{
                padding: '10px 24px',
                border: '2px solid #1E6F44',
                backgroundColor: 'transparent',
                color: '#1E6F44',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '12px',
                fontFamily: 'monospace',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Terminate Uplink & Return [ESC]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
