import { fireEvent, render, screen, within } from "@testing-library/react";
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
import { useDesafioClasificacionGame } from "../../../../shared/hooks/games/useDesafioClasificacionGame";

const baseMock = {
  gameConfig: {
    categories: [
      { id: "c1", name: "Animales" },
      { id: "c2", name: "Frutas" },
    ],
  },
  availableConcepts: ["Perro", "Gato", "Manzana"],
  conceptsInCategories: { c1: [], c2: [] },
  handleDragOver: vi.fn(),
  handleDropToPool: vi.fn(),
  handleDragStart: vi.fn(),
  handleDrop: vi.fn(),
  verifyAnswers: vi.fn(),
  gameStatus: "playing",
  verificationResults: null,
  score: 0,
  startGame: vi.fn(),
  gameStarted: true,
};
// mock del hook que usa el componente
vi.mock("../../../../shared/hooks/games/useDesafioClasificacionGame", () => {
  return {
    useDesafioClasificacionGame: vi.fn(() => baseMock),
  };
});

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
  beforeEach(() => {
    (useDesafioClasificacionGame as any).mockReturnValue(baseMock);
  });
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

  it("Escenario 2: El estudiante arrastra un concepto a una categoría", async () => {
    const { rerender } = renderDesafioClasificacionGame();

    // aseguramos que el concepto "Perro" está en el pool
    const pool = screen.getByTestId("pool");
    expect(within(pool).getByText("Perro")).toBeInTheDocument();

    const category = screen.getByTestId("categoria-Animales");

    // 2️⃣ Simular drag & drop
    const concept = within(pool).getByText("Perro");
    fireEvent.dragStart(concept);
    fireEvent.dragOver(category);
    fireEvent.drop(category);

    // actualizamos el mock para reflejar el cambio
    (useDesafioClasificacionGame as any).mockReturnValueOnce({
      ...baseMock,
      availableConcepts: ["Gato", "Manzana"], // Perro ya no está
      conceptsInCategories: { c1: ["Perro"], c2: [] },
      handleDragStart: vi.fn(),
      handleDrop: vi.fn(),
      handleDragOver: vi.fn(),
      handleDropToPool: vi.fn(),
      verifyAnswers: vi.fn(),
    });

    // re-render con el nuevo estado del hook
    rerender(<DesafioClasificacionGame />);

    expect(screen.getByTestId("pool")).not.toHaveTextContent("Perro");
    const categoria = screen.getByTestId("categoria-Animales");
    expect(categoria).toHaveTextContent("Perro");
  });

  it("Escenario 3: El estudiante devuelve un concepto al pool", async () => {
    (useDesafioClasificacionGame as any).mockReturnValueOnce({
      ...baseMock,
      availableConcepts: ["Gato", "Manzana"], // Perro ya no está
      conceptsInCategories: { c1: ["Perro"], c2: [] },
      handleDragStart: vi.fn(),
      handleDrop: vi.fn(),
      handleDragOver: vi.fn(),
      handleDropToPool: vi.fn(),
      verifyAnswers: vi.fn(),
    });
    const { rerender } = renderDesafioClasificacionGame();

    // aseguramos que el concepto "Perro" está en la categoria animales
    expect(screen.getByTestId("pool")).not.toHaveTextContent("Perro");
    const categoria = screen.getByTestId("categoria-Animales");
    expect(categoria).toHaveTextContent("Perro");

    const pool = screen.getByTestId("pool");

    // 2️⃣ Simular drag & drop
    const concept = within(categoria).getByText("Perro");
    fireEvent.dragStart(concept);
    fireEvent.dragOver(pool);
    fireEvent.drop(pool);

    // actualizamos el mock para reflejar el cambio

    // 4️⃣ Rerender con nuevo estado
    rerender(<DesafioClasificacionGame />);
    expect(screen.getByTestId("pool")).toHaveTextContent("Perro");

    expect(screen.getByTestId("categoria-Animales")).not.toHaveTextContent(
      "Perro"
    );
  });
});
