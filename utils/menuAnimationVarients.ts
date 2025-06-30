export const submenuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  // Variants for each submenu item (slide/fade)
export const itemVariants = {
    hidden: { y: -8, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };