import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const ANIMATION_DURATION = 300;

const Toast = ({ message, type, onClose }: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in animation
    const enter = requestAnimationFrame(() => {
      setVisible(true);
    });

    // Auto close
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      cancelAnimationFrame(enter);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);

    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  };

  const styles = type === "SUCCESS" ? "text-green-900 border-green-700" : "text-red-500 border-red-700";

  return (
    <div
      onClick={handleClose}
      className={`
        fixed top-5 right-5 z-50
        cursor-pointer
        rounded-lg
        border
        px-5 py-4
        shadow-xl
        transition-all
        duration-300
        ease-in-out
        select-none
        bg-black
        ${styles}
        ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{type === "SUCCESS" ? "✅" : "❌"}</span>

        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
