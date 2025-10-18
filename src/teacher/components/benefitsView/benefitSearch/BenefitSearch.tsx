import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Input from "../../../../shared/components/Input/InputComponent";
import {
  BENEFIT_CATEGORIES,
  BENEFIT_PLACEHOLDERS,
} from "../../../constants/benefits.constants";
import styles from "./BenefitSearch.module.css";

type BenefitSearchProps = {
  handleSearch: (value: string) => void;
  handleFilter: (filter: string[], value: string[]) => void;
};

const BenefitSearch = ({ handleFilter, handleSearch }: BenefitSearchProps) => {
  const categoriesForFilter = [
    "ALL",
    ...BENEFIT_CATEGORIES.map((c) => c.value),
  ] as const;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedCategory === "ALL") {
      handleFilter(["category"], []);
    } else {
      handleFilter(["category"], [selectedCategory]);
    }
  }, [selectedCategory]);

  const getCategoryLabel = (value: string): string => {
    if (value === "ALL") return BENEFIT_PLACEHOLDERS.DEFAULT_CATEGORY;
    const category = BENEFIT_CATEGORIES.find((c) => c.value === value);
    return category?.label || value;
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.filtersCard}>
        <div className={styles.filtersContent}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <Input
              placeholder={BENEFIT_PLACEHOLDERS.SEARCH_BENEFITS}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <FaFilter className={styles.filterIcon} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                {categoriesForFilter.map((category) => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BenefitSearch;
