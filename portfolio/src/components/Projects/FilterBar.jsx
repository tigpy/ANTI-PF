import { motion } from "framer-motion";
import { projectCategories } from "../../data/projectsData";

const FilterBar = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {projectCategories.map((category) => {
        const isActive = active === category;
        return (
          <motion.button
            key={category}
            onClick={() => onChange(category)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive
                ? "text-[#0B1020]"
                : "text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="filter-bg"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00FF9D] to-[#4CC9F0]"
                transition={{ type: "spring", damping: 22, stiffness: 280 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default FilterBar;
