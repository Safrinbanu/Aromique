import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Scroll To Top */}
      {showTop && (
        <button
          onClick={handleScrollTop}
          className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-xl hover:bg-primary transition-all duration-300"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
