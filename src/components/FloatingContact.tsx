"use client";
import { useState } from "react";
import { FaPhone, FaTelegram, FaWhatsapp, FaFacebookF, FaHeadset, FaXmark } from "react-icons/fa6";

export default function FloatingContact({
  phone,
  telegram,
  whatsapp,
  facebook,
}: {
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  facebook?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleCopyPhone = () => {
    if (phone) {
      navigator.clipboard.writeText(phone);
      alert("Number copied to clipboard!");
    }
  };

  return (
    <div className="floating-contact">
      <div className={`contact-menu ${isOpen ? "open" : ""}`} style={{ background: 'var(--card-bg)', padding: '15px', borderRadius: '15px', border: '1px solid var(--card-border)', backdropFilter: 'blur(10px)', alignItems: 'center' }}>
        
        <p className="made-by" style={{ fontSize: '0.85rem', marginBottom: '10px', whiteSpace: 'nowrap', textAlign: 'center' }}>
          Made by <span className="highlight" style={{ color: 'var(--blue-accent)', fontWeight: 700 }}>Eng. Fares Mohammed</span>
        </p>

        <div style={{ display: 'flex', gap: '10px' }}>
          {facebook && (
            <a href={facebook} target="_blank" rel="noreferrer" className="social-btn" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>
              <FaFacebookF />
            </a>
          )}
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noreferrer" className="social-btn" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>
              <FaWhatsapp />
            </a>
          )}
          {telegram && (
            <a href={telegram} target="_blank" rel="noreferrer" className="social-btn" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>
              <FaTelegram />
            </a>
          )}
          {phone && (
            <button onClick={handleCopyPhone} className="social-btn" title="Copy Number" style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}>
              <FaPhone />
            </button>
          )}
        </div>
      </div>
      <button onClick={toggleOpen} className="floating-toggle">
        {isOpen ? <FaXmark /> : <FaHeadset />}
      </button>
    </div>
  );
}
