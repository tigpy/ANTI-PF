import { motion } from "framer-motion";

const SkillTab = ({ label, isActive, onClick, icon: Icon }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
        isActive
          ? "text-[#F6F5F0]"
          : "text-[#5C615D] hover:text-[#181A1B] bg-[#EFECE3] border border-[#181A1B]/12 hover:border-[#181A1B]/30"
      }`}
    >
      {/* Active background */}
      {isActive && (
        <motion.div
          layoutId="skill-tab-bg"
          className="absolute inset-0 rounded-xl bg-[#181A1B]"
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon size={14} />}
        {label}
      </span>
    </motion.button>
  );
};

export default SkillTab;
