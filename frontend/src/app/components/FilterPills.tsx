type FilterPillsProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
  className?: string;
};

export function FilterPills({
  options,
  selectedOption,
  onSelect,
  className = "",
}: FilterPillsProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 rounded-full text-[14px] whitespace-nowrap transition-colors hover:cursor-pointer ${
            selectedOption === option
              ? "bg-[#1351b4] text-white"
              : "bg-white text-[#1351b4] border border-[#1351b4] hover:bg-gray-50"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
