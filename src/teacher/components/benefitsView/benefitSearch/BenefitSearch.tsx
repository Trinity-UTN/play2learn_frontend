import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./BenefitSearch.module.css";
import { categories } from "../../../types/BenefitType";
import { FaSearch, FaFilter } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import Input from "../../../../shared/components/Input/InputComponent";

type Props = {
  handleSearch: (value: string) => void;
  handleFilter: (filter: string[], value: string[]) => void;
};
const BenefitSearch = ({ handleFilter, handleSearch }: Props) => {
  const categoriesForFilter = ["ALL", ...categories] as const;
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

  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.filtersCard}>
        <div className={styles.filtersContent}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <Input
              placeholder="Buscar beneficios..."
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
                    {category === "ALL" ? "Todas las categorías" : category}
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
