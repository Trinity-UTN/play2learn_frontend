import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoreHeader from "../../components/studentStoreViewComponents/StoreHeader/StoreHeader";
import CategoryTabs from "../../components/studentStoreViewComponents/CategoryTabs/CategoryTabs";
import SkinsGrid from "../../components/studentStoreViewComponents/SkinsGrid/SkinsGrid";
import PurchaseModal from "../../components/studentStoreViewComponents/PurchaseModal/PurchaseModal";
import type { BodyPart } from "../../types/CurrentStudent.type";
import styles from "./StudentStoreView.module.css";
import { useCurrentStudent } from "../../hooks/useCurrentStudent";
import { useStore } from "../../hooks/useStoreStudent";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import LoadingSpinnerComponent from "../../../shared/components/LoadingSpinner/LoadingSpinnerComponent";
import type { PaginationInfo } from "../../context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";

const StudentStoreView: React.FC = () => {
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  } = usePaginationParams();
  const { aspects, getPaginatedAspects, loading, buyAspect } = useStore();
  const { currentStudent, getCurrentStudentByToken } = useCurrentStudent();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkin, setSelectedSkin] = useState<BodyPart | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [userBalance] = useState(
    currentStudent ? currentStudent.wallet.balance.toFixed(2) : "Sin saldo"
  );
  useEffect(() => {
    getPaginatedAspects(paginationParams);
  }, [paginationParams]);

  const paginationInfo: PaginationInfo | null = aspects
    ? {
        currentPage: aspects.currentPage,
        totalPages: aspects.totalPages,
        pageSize: aspects.pageSize,
        totalItems: aspects.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  const handlePurchase = (skin: BodyPart) => {
    window.scrollTo(0, 0);
    setSelectedSkin(skin);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = async () => {
    if (selectedSkin && currentStudent) {
      const data = {
        aspectId: selectedSkin.id,
        profileId: currentStudent.profile.id,
      };
      await buyAspect(data);
      await getCurrentStudentByToken();
      getPaginatedAspects(paginationParams);
      setShowPurchaseModal(false);
      setSelectedSkin(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (!aspects?.results || loading) {
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
