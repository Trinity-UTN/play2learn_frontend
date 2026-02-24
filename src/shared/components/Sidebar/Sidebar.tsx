
import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css"
import { motion, type Variants } from "framer-motion"
import { useAuth } from "@/user/hooks/useAuth";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import Button from "../Button/ButtonComponent";
import { FaSignOutAlt } from "react-icons/fa";

type Props = {
    children: React.ReactNode;
    isLoading: boolean;
    handleNavegacion: () => void;
    colorBtnMenu?: string;
}

export const Sidebar = ({ children, isLoading, handleNavegacion, colorBtnMenu }: Props) => {
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const containerVariants: Variants = {
        hidden: { x: -250 },
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.1,
            },
        },
    };
    const itemVariants: Variants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    useEffect(() => {
        setIsMenuOpen(false)
    }, [handleNavegacion])

    return (
        <div className={styles.container}>
            <div className={styles.contSidebar}>
                {isMenuOpen ? (
                    <>
                        <div
                            className={styles.overlay}
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <button className={styles.closeMenu} onClick={() => setIsMenuOpen(false)}>
                            <HiX />
                        </button>
                    </>
                ) :

                    <button
                        className={styles.menuButton}
                        onClick={() => setIsMenuOpen(true)}
                        style={{ color: colorBtnMenu }}
                    >
                        <HiMenuAlt2 />
                    </button>
                }
                <motion.aside
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`${styles.sidebar} ${isLoading ? styles.loading : ""} ${isMenuOpen && styles.sidebarOpen}`}
                >
                    <>
                        {children}
                        <motion.div variants={itemVariants} className={styles.footer}>
                            {isLoading ? (
                                <div className={styles.logoutSkeleton}></div>
                            ) : (
                                <Button
                                    variant="ghost"
                                    fullWidth
                                    onClick={logout}
                                    className={styles.logoutButton}
                                >
                                    <FaSignOutAlt className={styles.logoutIcon} />
                                    Cerrar Sesión
                                </Button>
                            )}
                        </motion.div>
                    </>

                </motion.aside>


            </div>
        </div>
    )
}

