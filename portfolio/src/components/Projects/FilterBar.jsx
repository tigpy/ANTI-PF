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
            className={`relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
              isActive
                ? "text-[#F6F5F0]"
                : "text-[#5C615D] hover:text-[#181A1B] bg-[#EFECE3] border border-[#181A1B]/12 hover:border-[#181A1B]/30"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="filter-bg"
                className="absolute inset-0 rounded-xl bg-[#181A1B]"
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
