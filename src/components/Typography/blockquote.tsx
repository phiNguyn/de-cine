import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export function Blockquote({ children, className }: { children?: ReactNode; className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <blockquote
      className={cn(
        "mt-6 italic",
        !isExpanded && "line-clamp-3", // Thêm class "line-clamp-3" khi thu gọn
        className
      )}
    >
      "{children}"
      <button
        onClick={toggleExpand}
        className="text-blue-500 ml-2 underline"
      >
        {isExpanded ? "Thu gọn" : "Xem đầy đủ"}
      </button>
    </blockquote>
  );
}
