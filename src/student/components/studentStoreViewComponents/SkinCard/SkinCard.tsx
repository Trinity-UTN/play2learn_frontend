import { FaCoins, FaCheckCircle, FaLock, FaShoppingCart } from "react-icons/fa";
import { Badge, Button, Card } from "@/shared";
import type { BodyPart } from "../../../types/CurrentStudent.type";
import styles from "./SkinCard.module.css";

interface SkinCardProps {
  skin: BodyPart;
  onPurchase: (skin: BodyPart) => void;
  userBalance: number | string;
}

const SkinCard: React.FC<SkinCardProps> = ({
  skin,
  onPurchase,
  userBalance,
}) => {
  const canAfford =
    userBalance !== "Sin saldo"
      ? (userBalance as number) >= skin.price
      : "Sin Saldo";
  const isOwned = skin.bought;
  const isAvailable = skin.available;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "avatar":
        return "#3b82f6";
      case "sombrero":
        return "#f59e0b";
      default:
        return "#8b5cf6";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "REMERA":
        return "Remera";
      case "SOMBRERO":
        return "Sombrero";
      case "CUERPO":
        return "Cuerpo";
      default:
        return "Item";
    }
  };

  return (
    <Card
      className={`${styles.skinCard} ${isOwned ? styles.owned : ""} ${
        !isAvailable ? styles.unavailable : ""
      }`}
    >
      <div className={styles.cardHeader}>
        <Badge
          variant="primary"
          className={styles.typeBadge}
          //   style={{
          //     backgroundColor: `${getTypeColor(skin.type)}20`,
          //     color: getTypeColor(skin.type),
          //   }}
        >
          {getTypeLabel(skin.type)}
        </Badge>

        {isOwned && (
          <div className={styles.ownedBadge}>
            <FaCheckCircle />
            <span>Comprado</span>
          </div>
        )}
      </div>

      <div className={styles.imageContainer}>
        <div
          className={styles.imagePlaceholder}
          style={{
            background: `linear-gradient(135deg, ${getTypeColor(
              skin.type
            )}20, ${getTypeColor(skin.type)}40)`,
          }}
        >
          <div
            className={styles.image}
            style={{ color: getTypeColor(skin.type) }}
          >
            <img src={skin.image} alt={String(skin.id)} />
          </div>
        </div>

        {!isAvailable && (
          <div className={styles.lockedOverlay}>
            <FaLock className={styles.lockIcon} />
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.skinName}>{skin.name}</h3>

        <div className={styles.priceContainer}>
          <FaCoins className={styles.coinIcon} />
          <span className={styles.price}>{skin.price.toLocaleString()}</span>
        </div>

        {!canAfford && !isOwned && isAvailable && (
          <div className={styles.insufficientFunds}>
            <span>Monedas insuficientes</span>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        {isOwned ? (
          <Button
            variant="secondary"
            fullWidth
            disabled
            className={styles.ownedButton}
          >
            <FaCheckCircle className={styles.buttonIcon} />
            Ya lo tienes
          </Button>
        ) : !isAvailable ? (
          <Button
            variant="secondary"
            fullWidth
            disabled
            className={styles.lockedButton}
          >
            <FaLock className={styles.buttonIcon} />
            Bloqueado
          </Button>
        ) : (
          <Button
            variant="primary"
            fullWidth
            disabled={!canAfford}
            onClick={() => onPurchase(skin)}
            className={styles.buyButton}
          >
            <FaShoppingCart className={styles.buttonIcon} />
            Comprar
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SkinCard;
