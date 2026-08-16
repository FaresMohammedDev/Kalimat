"use client";

import { useState } from "react";
import { FaPhone, FaTelegram, FaWhatsapp, FaFacebookF, FaCommentDots, FaXmark } from "react-icons/fa6";

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
      <div className={`contact-menu ${isOpen ? "open" : ""}`}>
        {facebook && (
          <a href={facebook} target="_blank" rel="noreferrer" className="social-btn">
            <FaFacebookF />
          </a>
        )}
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noreferrer" className="social-btn">
            <FaWhatsapp />
          </a>
        )}
        {telegram && (
          <a href={telegram} target="_blank" rel="noreferrer" className="social-btn">
            <FaTelegram />
          </a>
        )}
        {phone && (
          <button onClick={handleCopyPhone} className="social-btn" title="Copy Number">
            <FaPhone />
          </button>
        )}
      </div>
      <button onClick={toggleOpen} className="floating-toggle">
        {isOpen ? <FaXmark /> : <FaCommentDots />}
      </button>
    </div>
  );
}
