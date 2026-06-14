import { motion } from "framer-motion";

const SkillTab = ({ label, isActive, onClick, icon: Icon }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
        isActive
          ? "text-[#0B1020]"
          : "text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
      }`}
    >
      {/* Active background */}
      {isActive && (
        <motion.div
          layoutId="skill-tab-bg"
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00FF9D] to-[#4CC9F0]"
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
