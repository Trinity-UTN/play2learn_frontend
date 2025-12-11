import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaQuestionCircle } from "react-icons/fa";
import { Button } from "@/shared";
import styles from "./NavigationTabs.module.css";

interface NavigationTabsProps {
  currentSection: "concepts" | "quiz";
  onSectionChange: (section: "concepts" | "quiz") => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  currentSection,
  onSectionChange,
}) => {
  const tabs = [
    { id: "concepts" as const, label: "Conceptos", icon: FaBook },
    { id: "quiz" as const, label: "Quiz", icon: FaQuestionCircle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={styles.navigation}
    >
      <div className={styles.tabsContainer}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSection === tab.id;

          return (
            <Button
              key={tab.id}
              variant={isActive ? "primary" : "ghost"}
              onClick={() => onSectionChange(tab.id)}
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
            >
              <Icon className={styles.tabIcon} />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default NavigationTabs;
