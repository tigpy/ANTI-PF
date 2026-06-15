const SkillTab = ({ label, isActive, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-[1px] active:scale-95 cursor-pointer ${
        isActive
          ? "text-bg-primary"
          : "text-text-secondary hover:text-text-primary bg-bg-secondary border border-border-color hover:border-text-primary"
      }`}
    >
      {/* Active background */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-xl bg-text-primary"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={14} />}
        {label}
      </span>
    </button>
  );
};

export default SkillTab;
