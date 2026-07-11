import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { CircleCheckBig, X } from "lucide-react";

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

  const styles = type === "SUCCESS" ? "border-green-700 bg-green-400" : "border-red-700 bg-red-400";

  return (
    <div
      onClick={handleClose}
      className={cn("fixed top-5 right-5 z-50 cursor-pointer rounded-lg border px-5 py-4 shadow-xl select-none text-white", styles, visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0")}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{type === "SUCCESS" ? <CircleCheckBig /> : <X />}</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
