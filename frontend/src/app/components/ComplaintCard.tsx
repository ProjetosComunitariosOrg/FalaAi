import { MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type ComplaintCardProps = {
  title: string;
  status: string;
  date: string;
  category?: string;
  address?: string;
  description?: string;
  images?: string[];
  onClick: () => void;
  variant?: "summary" | "detailed";
  className?: string;
};

export function ComplaintCard({
  title,
  status,
  date,
  category,
  address,
  description,
  images,
  onClick,
  variant = "detailed",
  className = "",
}: ComplaintCardProps) {
  if (variant === "summary") {
    return (
      <button
        onClick={onClick}
        className={`w-full p-[16px] text-left hover:bg-gray-50 transition-colors hover:cursor-pointer ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[11.67px] text-black mb-1">
              {new Date(date).toLocaleDateString("pt-BR")}
            </p>
            <p className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black mb-1">
              {title}
            </p>
            <StatusBadge status={status} />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-4 w-full text-left hover:shadow-lg transition-shadow hover:cursor-pointer ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {category && (
              <span className="text-[11px] text-[#666] bg-[#f0f0f0] px-2 py-1 rounded">
                {category}
              </span>
            )}
            <StatusBadge status={status} />
          </div>
          <p className="font-['Rawline:SemiBold',sans-serif] text-[16px] text-black mb-1">
            {title}
          </p>
          {address && (
            <div className="flex items-center gap-1 text-[12px] text-[#666] mb-2">
              <MapPin className="size-3" />
              <p>{address}</p>
            </div>
          )}
        </div>
      </div>

      {description && (
        <p className="text-[14px] text-[#333] mb-3 line-clamp-2">
          {description}
        </p>
      )}

      {images && images.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {images.slice(0, 3).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Imagem ${index + 1}`}
              className="w-16 h-16 object-cover rounded"
            />
          ))}
          {images.length > 3 && (
            <div className="w-16 h-16 bg-[#f0f0f0] rounded flex items-center justify-center">
              <p className="text-[12px] text-[#666]">+{images.length - 3}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-[#666] pt-2 border-t border-[#f0f0f0]">
        <p>Criado em: {new Date(date).toLocaleDateString("pt-BR")}</p>
      </div>
    </button>
  );
}
