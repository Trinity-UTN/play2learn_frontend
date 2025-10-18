import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoreHeader from "../../components/studentStoreViewComponents/StoreHeader/StoreHeader";
import CategoryTabs from "../../components/studentStoreViewComponents/CategoryTabs/CategoryTabs";
import SkinsGrid from "../../components/studentStoreViewComponents/SkinsGrid/SkinsGrid";
import PurchaseModal from "../../components/studentStoreViewComponents/PurchaseModal/PurchaseModal";
import type { BodyPart } from "../../types/CurrentStudent.type";
import styles from "./StudentStoreView.module.css";
import { useProfileAvatar } from "../../hooks/useProfileAvatar";
const StudentStoreView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkin, setSelectedSkin] = useState<BodyPart | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [userBalance] = useState(2450); // Mock balance
  const { filteredAspects } = useProfileAvatar();

  const filteredSkins = filteredAspects.filter((skin) => {
    if (selectedCategory === "all") return true;
    return skin.type === selectedCategory;
  });

  const handlePurchase = (skin: BodyPart) => {
    setSelectedSkin(skin);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    if (selectedSkin) {
      console.log("Comprando:", selectedSkin);
      // Aquí iría la lógica de compra real
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.storeView}
    >
      <StoreHeader
        balance={userBalance}
        totalItems={filteredAspects.length}
        ownedItems={
          filteredAspects
            .filter((s): s is BodyPart => "bought" in s)
            .filter((s) => s.bought).length
        }
      />

      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        avatarCount={filteredAspects.filter((s) => s.type === "avatar").length}
        hatCount={filteredAspects.filter((s) => s.type === "sombrero").length}
      />

      <SkinsGrid
        skins={filteredSkins}
        onPurchase={handlePurchase}
        userBalance={userBalance}
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
