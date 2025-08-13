import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type { StudentProfile } from "../types/walletType";

interface StudentAuthContextType {
  isAuthenticated: boolean;
  student: StudentProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(
  undefined
);

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (context === undefined) {
    throw new Error("useStudentAuth must be used within a StudentAuthProvider");
  }
  return context;
};

interface StudentAuthProviderProps {
  children: React.ReactNode;
}

export const StudentAuthProvider: React.FC<StudentAuthProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock student data
  const mockStudent: StudentProfile = {
    id: "student-1",
    name: "Ana García",
    email: "ana.garcia@estudiante.edu",
    avatar: "/placeholder.svg?height=100&width=100",
    level: 12,
    points: 2450,
    rank: 3,
    streak: 7,
    joinDate: "2024-02-15",
    achievements: [
      {
        id: "first-activity",
        name: "Primera Actividad",
        description: "Completaste tu primera actividad",
        icon: "🎯",
        color: "#10B981",
        isUnlocked: true,
        unlockedDate: "2024-02-16",
      },
      {
        id: "streak-master",
        name: "Racha de 7 días",
        description: "Mantuviste una racha de 7 días consecutivos",
        icon: "🔥",
        color: "#F59E0B",
        isUnlocked: true,
        unlockedDate: "2024-03-01",
      },
      {
        id: "top-student",
        name: "Top 5",
        description: "Llegaste al top 5 del ranking",
        icon: "⭐",
        color: "#8B5CF6",
        isUnlocked: true,
        unlockedDate: "2024-03-10",
      },
      {
        id: "big-spender",
        name: "Gran Comprador",
        description: "Gasta 1000 monedas en la tienda",
        icon: "💰",
        color: "#EF4444",
        isUnlocked: false,
        progress: 750,
        maxProgress: 1000,
      },
    ],
  };

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      setLoading(true);
      try {
        const savedAuth = localStorage.getItem("studentAuth");
        if (savedAuth === "true") {
          setIsAuthenticated(true);
          setStudent(mockStudent);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (email === "estudiante@test.com" && password === "123456") {
        setIsAuthenticated(true);
        setStudent(mockStudent);
        localStorage.setItem("studentAuth", "true");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setStudent(null);
    localStorage.removeItem("studentAuth");
  };

  const value: StudentAuthContextType = {
    isAuthenticated,
    student,
    login,
    logout,
    loading,
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
};
