"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaStore,
  FaGift,
  FaPalette,
  FaRocket,
  FaFire,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import type { StoreItem } from "../../types/walletType";
import styles from "./StudentStoreView.module.css";

const StudentStoreView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<string[]>([]);

  const storeItems: StoreItem[] = [
    {
      id: "1",
      name: "Avatar Espacial",
      description: "Un avatar único con temática espacial",
      price: 150,
      category: "cosmetics",
      icon: "🚀",
      color: "#8b5cf6",
      isNew: true,
    },
    {
      id: "2",
      name: "Tema Oscuro Premium",
      description: "Tema oscuro exclusivo con efectos especiales",
      price: 200,
      category: "themes",
      icon: "🌙",
      color: "#1e293b",
      isPopular: true,
    },
    {
      id: "3",
      name: "Multiplicador x3",
      description: "Triplica los puntos de tu próxima actividad",
      price: 180,
      category: "power-ups",
      icon: "⚡",
      color: "#f59e0b",
      isLimited: true,
    },
    {
      id: "4",
      name: "Extensión de Tiempo Pro",
      description: "Obtén 10 minutos extra en cualquier actividad",
      price: 120,
      category: "benefits",
      icon: "⏰",
      color: "#3b82f6",
    },
    {
      id: "5",
      name: "Avatar Ninja",
      description: "Avatar ninja con animaciones especiales",
      price: 175,
      category: "cosmetics",
      icon: "🥷",
      color: "#ef4444",
      isPopular: true,
    },
    {
      id: "6",
      name: "Tema Neón",
      description: "Tema vibrante con colores neón",
      price: 160,
      category: "themes",
      icon: "🌈",
      color: "#06b6d4",
      isNew: true,
    },
    {
      id: "7",
      name: "Escudo Dorado",
      description: "Protección premium contra errores",
      price: 250,
      category: "power-ups",
      icon: "🛡️",
      color: "#f59e0b",
      isLimited: true,
    },
    {
      id: "8",
      name: "Pistas Ilimitadas",
      description: "Pistas sin límite por 24 horas",
      price: 300,
      category: "benefits",
      icon: "💡",
      color: "#10b981",
      discount: 20,
    },
  ];

  const categories = [
    { value: "all", label: "Todos", icon: FaStore },
    { value: "benefits", label: "Beneficios", icon: FaGift },
    { value: "cosmetics", label: "Cosméticos", icon: FaPalette },
    { value: "power-ups", label: "Power-ups", icon: FaRocket },
    { value: "themes", label: "Temas", icon: FaStar },
  ];

  const filteredItems = storeItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const addToCart = (itemId: string) => {
    setCart((prev) => [...prev, itemId]);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((id) => id !== itemId));
  };

  const isInCart = (itemId: string) => cart.includes(itemId);

  const getDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return price;
    return Math.round(price * (1 - discount / 100));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.store}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <FaStore className={styles.titleIcon} />
            Tienda
          </h1>
          <p className={styles.subtitle}>
            Descubre increíbles items para personalizar tu experiencia
          </p>
        </div>
        <div className={styles.cartInfo}>
          <div className={styles.cartIcon}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className={styles.cartBadge}>{cart.length}</span>
            )}
          </div>
          <div className={styles.balance}>
            <span className={styles.balanceLabel}>Tu saldo:</span>
            <span className={styles.balanceValue}>2,450 monedas</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.categories}>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={
                selectedCategory === category.value ? "primary" : "ghost"
              }
              onClick={() => setSelectedCategory(category.value)}
              className={styles.categoryButton}
            >
              <category.icon className={styles.categoryIcon} />
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.content}>
        <div className={styles.itemsGrid}>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <div
                    className={styles.itemIcon}
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className={styles.itemBadges}>
                    {item.isNew && (
                      <Badge variant="success" className={styles.newBadge}>
                        ¡Nuevo!
                      </Badge>
                    )}
                    {item.isPopular && (
                      <Badge variant="warning" className={styles.popularBadge}>
                        <FaFire className={styles.badgeIcon} />
                        Popular
                      </Badge>
                    )}
                    {item.isLimited && (
                      <Badge variant="danger" className={styles.limitedBadge}>
                        Limitado
                      </Badge>
                    )}
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>

                  <div className={styles.priceSection}>
                    {item.discount ? (
                      <div className={styles.discountPrice}>
                        <span className={styles.originalPrice}>
                          {item.price}
                        </span>
                        <span className={styles.discountedPrice}>
                          {getDiscountedPrice(item.price, item.discount)}
                        </span>
                        <Badge
                          variant="danger"
                          className={styles.discountBadge}
                        >
                          -{item.discount}%
                        </Badge>
                      </div>
                    ) : (
                      <span className={styles.price}>{item.price}</span>
                    )}
                    <span className={styles.currency}>monedas</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {isInCart(item.id) ? (
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeButton}
                    >
                      Quitar del carrito
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => addToCart(item.id)}
                      className={styles.addButton}
                    >
                      <FaShoppingCart className={styles.buttonIcon} />
                      Agregar al carrito
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.cartSummary}
        >
          <Card className={styles.cartCard}>
            <div className={styles.cartContent}>
              <div className={styles.cartDetails}>
                <span className={styles.cartItemCount}>
                  {cart.length} items en el carrito
                </span>
                <span className={styles.cartTotal}>
                  Total:{" "}
                  {cart.reduce((total, itemId) => {
                    const item = storeItems.find((i) => i.id === itemId);
                    if (!item) return total;
                    return (
                      total + getDiscountedPrice(item.price, item.discount)
                    );
                  }, 0)}{" "}
                  monedas
                </span>
              </div>
              <Button variant="primary" className={styles.checkoutButton}>
                Proceder al pago
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentStoreView;
