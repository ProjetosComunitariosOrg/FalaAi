type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-[#FFA800] text-white";
      case "Em Análise":
        return "bg-[#1351b4] text-white";
      case "Resolvido":
        return "bg-[#54AB34] text-white";
      default:
        return "bg-[#ccc] text-black";
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap ${getStatusColor(
        status,
      )} ${className}`}
    >
      {status}
    </span>
  );
}
