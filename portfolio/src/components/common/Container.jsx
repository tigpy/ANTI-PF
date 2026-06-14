/**
 * Container — consistent max-width + horizontal padding for all sections.
 *
 * Props:
 *   as        — HTML element or component (default: "div")
 *   className — additional classes
 *   children
 */
const Container = ({ as: Tag = "div", className = "", children }) => {
  return (
    <Tag className={`max-w-7xl mx-auto px-6 lg:px-10 ${className}`}>
      {children}
    </Tag>
  );
};

export default Container;
