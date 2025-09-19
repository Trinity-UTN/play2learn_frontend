import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActivityStudentProvider } from "../../../../student/context/activityStudentContext/activityStudentContextAPI/ActivityStudentProviderAPI";
import { ActivityStudentProviderUI } from "../../../../student/context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";
import { ToasterProvider } from "../../../../shared/contexts/toasterContext/ToasterProvider";
import { ConfirmationProvider } from "../../../../shared/contexts/confirmationContext/ConfirmationProvider";
import { ConfigurationActivityProvider } from "../../../../activity/contexts/configurationActivityContext/ConfigurationActivityProvider";
import DesafioClasificacionGame from "../../../../shared/components/Games/DesafioClasificacion/DesafioClasificacionGame";
import { DesafioClasificacionProvider } from "../../../../activity/contexts/desafioClasificacionContext/DesafioClasificacionProvider";
import { DesafioClasificacionGameProvider } from "../../../../shared/contexts/gamesContext/desafioClasificacionGameContext/DesafioClasificacionGameProvider";
import { MemoryRouter } from "react-router-dom";
// mock del hook que usa el componente
vi.mock("../../../../shared/hooks/games/useDesafioClasificacionGame", () => ({
  useDesafioClasificacionGame: () => ({
    gameConfig: {
      categories: [
        { id: "c1", name: "Animales" },
        { id: "c2", name: "Frutas" },
      ],
    },
    availableConcepts: ["Perro", "Gato", "Manzana"],
    handleDragOver: vi.fn(),
    handleDropToPool: vi.fn(),
    handleDragStart: vi.fn(),
    handleDrop: vi.fn(),
    conceptsInCategories: { c1: [], c2: [] },
    verifyAnswers: vi.fn(),
    gameStatus: "playing",
    verificationResults: null,
    score: 0,
    startGame: vi.fn(),
    gameStarted: true,
  }),
}));

const renderDesafioClasificacionGame = () =>
  render(
    <MemoryRouter>
      <ToasterProvider>
        <ConfirmationProvider>
          <ActivityStudentProvider>
            <ActivityStudentProviderUI>
              <ConfigurationActivityProvider>
                <DesafioClasificacionProvider>
                  <DesafioClasificacionGameProvider>
                    <DesafioClasificacionGame mode="student" />
                  </DesafioClasificacionGameProvider>
                </DesafioClasificacionProvider>
              </ConfigurationActivityProvider>
            </ActivityStudentProviderUI>
          </ActivityStudentProvider>
        </ConfirmationProvider>
      </ToasterProvider>
    </MemoryRouter>
  );

describe("Realizar Desafio de Clasificación", () => {
  it("Escenario 1: Renderizado Inicial", () => {
    renderDesafioClasificacionGame();

    // conceptos iniciales en el pool
    expect(screen.getByText("Perro")).toBeInTheDocument();
    expect(screen.getByText("Gato")).toBeInTheDocument();
    expect(screen.getByText("Manzana")).toBeInTheDocument();

    // categorías vacías visibles
    expect(screen.getByText("Animales")).toBeInTheDocument();
    expect(screen.getByText("Frutas")).toBeInTheDocument();
    expect(screen.getAllByText("Arrastra conceptos aquí")).toHaveLength(2);

    // contador de conceptos restantes correcto
    expect(screen.getByText("3 restantes")).toBeInTheDocument();
  });
});
