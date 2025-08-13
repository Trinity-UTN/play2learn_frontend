"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaGift,
  FaCheck,
  FaClock,
  FaFire,
  FaStar,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";
import Card from "../../../shared/components/Card/CardComponent";
import Button from "../../../shared/components/Button/ButtonComponent";
import Badge from "../../../shared/components/Badge/BadgeComponent";
import type { StudentBenefit } from "../../types/walletType";
import styles from "./StudentBenefitsView.module.css";

const StudentBenefitsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"owned" | "available">("owned");

  const ownedBenefits: StudentBenefit[] = [
    {
      id: "1",
      name: "Extensión de Tiempo",
      description: "Obtén 5 minutos extra en cualquier actividad",
      cost: 50,
      category: "Tiempo",
      icon: "⏰",
      color: "#3b82f6",
      isOwned: true,
      isActive: true,
      usesRemaining: 3,
    },
    {
      id: "2",
      name: "Pista Extra",
      description: "Recibe una pista adicional en actividades de ahorcado",
      cost: 30,
      category: "Ayuda",
      icon: "💡",
      color: "#f59e0b",
      isOwned: true,
      isActive: false,
      usesRemaining: 5,
    },
    {
      id: "3",
      name: "Segundo Intento",
      description: "Obtén un intento adicional en cualquier actividad",
      cost: 75,
      category: "Oportunidad",
      icon: "🔄",
      color: "#10b981",
      isOwned: true,
      isActive: false,
      usesRemaining: 2,
    },
    {
      id: "4",
      name: "Multiplicador x2",
      description: "Duplica los puntos obtenidos en la próxima actividad",
      cost: 100,
      category: "Puntos",
      icon: "⚡",
      color: "#8b5cf6",
      isOwned: true,
      isActive: true,
      expiryDate: "2024-03-20T23:59:59Z",
    },
    {
      id: "5",
      name: "Escudo Protector",
      description: "Protege tu racha de un día perdido",
      cost: 80,
      category: "Protección",
      icon: "🛡️",
      color: "#ef4444",
      isOwned: true,
      isActive: false,
      usesRemaining: 1,
    },
  ];

  const availableBenefits: StudentBenefit[] = [
    {
      id: "6",
      name: "Vista Previa",
      description: "Ve las primeras 3 preguntas antes de comenzar",
      cost: 60,
      category: "Información",
      icon: "👁️",
      color: "#06b6d4",
      isOwned: false,
      isActive: false,
    },
    {
      id: "7",
      name: "Pausa Extendida",
      description: "Pausa cualquier actividad por hasta 10 minutos",
      cost: 40,
      category: "Tiempo",
      icon: "⏸️",
      color: "#3b82f6",
      isOwned: false,
      isActive: false,
    },
    {
      id: "8",
      name: "Bonus de Racha",
      description: "Obtén puntos extra por mantener tu racha",
      cost: 90,
      category: "Puntos",
      icon: "🔥",
      color: "#f97316",
      isOwned: false,
      isActive: false,
    },
    {
      id: "9",
      name: "Respuesta Eliminada",
      description: "Elimina una respuesta incorrecta en preguntas múltiples",
      cost: 45,
      category: "Ayuda",
      icon: "❌",
      color: "#ef4444",
      isOwned: false,
      isActive: false,
    },
  ];

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tiempo":
        return FaClock;
      case "Ayuda":
        return FaStar;
      case "Oportunidad":
        return FaRocket;
      case "Puntos":
        return FaFire;
      case "Protección":
        return FaShieldAlt;
      default:
        return FaGift;
    }
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Expirado";
    if (diffDays === 1) return "Expira mañana";
    return `Expira en ${diffDays} días`;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.benefits}
    >
      <motion.div variants={itemVariants} className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <FaGift className={styles.titleIcon} />
            Mis Beneficios
          </h1>
          <p className={styles.subtitle}>
            Gestiona y activa tus beneficios para mejorar tu experiencia
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.tabs}>
        <div className={styles.tabButtons}>
          <Button
            variant={activeTab === "owned" ? "primary" : "ghost"}
            onClick={() => setActiveTab("owned")}
            className={styles.tabButton}
          >
            <FaCheck className={styles.tabIcon} />
            Mis Beneficios ({ownedBenefits.length})
          </Button>
          <Button
            variant={activeTab === "available" ? "primary" : "ghost"}
            onClick={() => setActiveTab("available")}
            className={styles.tabButton}
          >
            <FaGift className={styles.tabIcon} />
            Disponibles ({availableBenefits.length})
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.content}>
        {activeTab === "owned" && (
          <div className={styles.benefitsGrid}>
            {ownedBenefits.map((benefit, index) => {
              const CategoryIcon = getCategoryIcon(benefit.category);
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card
                    className={`${styles.benefitCard} ${
                      benefit.isActive ? styles.active : ""
                    }`}
                  >
                    <div className={styles.cardHeader}>
                      <div
                        className={styles.benefitIcon}
                        style={{
                          backgroundColor: `${benefit.color}20`,
                          color: benefit.color,
                        }}
                      >
                        {benefit.icon}
                      </div>
                      <div className={styles.benefitMeta}>
                        <Badge
                          variant={benefit.isActive ? "success" : "secondary"}
                          className={styles.statusBadge}
                        >
                          {benefit.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                        <div className={styles.categoryBadge}>
                          <CategoryIcon className={styles.categoryIcon} />
                          <span>{benefit.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.benefitName}>{benefit.name}</h3>
                      <p className={styles.benefitDescription}>
                        {benefit.description}
                      </p>

                      <div className={styles.benefitDetails}>
                        {benefit.usesRemaining && (
                          <div className={styles.usesRemaining}>
                            <span className={styles.usesLabel}>
                              Usos restantes:
                            </span>
                            <span className={styles.usesValue}>
                              {benefit.usesRemaining}
                            </span>
                          </div>
                        )}
                        {benefit.expiryDate && (
                          <div className={styles.expiryInfo}>
                            <span className={styles.expiryLabel}>
                              {formatExpiryDate(benefit.expiryDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <Button
                        variant={benefit.isActive ? "secondary" : "primary"}
                        fullWidth
                        className={styles.actionButton}
                        disabled={benefit.usesRemaining === 0}
                      >
                        {benefit.isActive ? "Desactivar" : "Activar"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "available" && (
          <div className={styles.benefitsGrid}>
            {availableBenefits.map((benefit, index) => {
              const CategoryIcon = getCategoryIcon(benefit.category);
              return (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className={styles.benefitCard}>
                    <div className={styles.cardHeader}>
                      <div
                        className={styles.benefitIcon}
                        style={{
                          backgroundColor: `${benefit.color}20`,
                          color: benefit.color,
                        }}
                      >
                        {benefit.icon}
                      </div>
                      <div className={styles.benefitMeta}>
                        <div className={styles.costBadge}>
                          <span className={styles.costValue}>
                            {benefit.cost}
                          </span>
                          <span className={styles.costLabel}>monedas</span>
                        </div>
                        <div className={styles.categoryBadge}>
                          <CategoryIcon className={styles.categoryIcon} />
                          <span>{benefit.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.benefitName}>{benefit.name}</h3>
                      <p className={styles.benefitDescription}>
                        {benefit.description}
                      </p>
                    </div>

                    <div className={styles.cardFooter}>
                      <Button
                        variant="primary"
                        fullWidth
                        className={styles.purchaseButton}
                      >
                        Comprar por {benefit.cost} monedas
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default StudentBenefitsView;
