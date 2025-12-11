import type { BodyPart } from "../../types/CurrentStudent.type";

import { motion, AnimatePresence } from "framer-motion";
import { containerVariants } from "../../constants/store.contanst";
import { useStoreStudentUI } from "../../hooks/useStoreStudentUI";

import styles from "./StudentStoreView.module.css";

import { LoadingSpinnerComponent } from "@/shared";
import StoreHeader from "../../components/studentStoreViewComponents/StoreHeader/StoreHeader";
import CategoryTabs from "../../components/studentStoreViewComponents/CategoryTabs/CategoryTabs";
import SkinsGrid from "../../components/studentStoreViewComponents/SkinsGrid/SkinsGrid";
import PurchaseModal from "../../components/studentStoreViewComponents/PurchaseModal/PurchaseModal";

const StudentStoreView: React.FC = () => {
  const {
    aspects,
    confirmPurchase,
    handleFilter,
    handlePurchase,
    paginationInfo,
    selectedCategory,
    selectedSkin,
    setSelectedCategory,
    setShowPurchaseModal,
    showPurchaseModal,
    userBalance,
    setSelectedSkin,
  } = useStoreStudentUI();

  if (!aspects?.results) {
    return <LoadingSpinnerComponent />;
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.storeView}
    >
      <StoreHeader
        balance={userBalance}
        totalItems={aspects.results.length}
        ownedItems={
          aspects.results
            .filter((s): s is BodyPart => "bought" in s)
            .filter((s) => s.bought).length
        }
      />

      <CategoryTabs
        handleFilter={handleFilter}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <SkinsGrid
        skins={aspects.results}
        onPurchase={handlePurchase}
        userBalance={userBalance}
        paginationInfo={paginationInfo}
      />

      <AnimatePresence>
        {showPurchaseModal && selectedSkin && (
          <PurchaseModal
            skin={selectedSkin}
            userBalance={userBalance}
            onConfirm={confirmPurchase}
            onCancel={() => {
              setShowPurchaseModal(false);
              setSelectedSkin(null);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentStoreView;
