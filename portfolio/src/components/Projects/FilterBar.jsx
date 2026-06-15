import { m } from "framer-motion";
import { projectCategories } from "../../data/projectsData";

const FilterBar = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {projectCategories.map((category) => {
        const isActive = active === category;
        return (
          <m.button
            key={category}
            onClick={() => onChange(category)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className={`relative px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
              isActive
                ? "text-bg-primary"
                : "text-text-secondary hover:text-text-primary bg-bg-secondary border border-border-color hover:border-text-primary"
            }`}
          >
            {isActive && (
              <m.div
                layoutId="filter-bg"
                className="absolute inset-0 rounded-xl bg-text-primary"
                transition={{ type: "spring", damping: 22, stiffness: 280 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </m.button>
        );
      })}
    </div>
  );
};

export default FilterBar;
