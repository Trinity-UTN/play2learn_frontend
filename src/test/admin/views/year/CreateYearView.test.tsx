import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateYearView from "../../../../admin/views/Year/CreateYearView";
import { YearProvider } from "../../../../admin/contexts/yearContext/YearProvider";
import { ToasterProvider } from "../../../../shared/contexts/toasterContext/ToasterProvider";
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    // useNavigate: () => mockNavigate,
    useParams: () => ({}),
  };
});

// Mock del hook
const registerYearMock = vi.fn();
const updateYearMock = vi.fn();
vi.mock("../../../../admin/hooks/useYear", () => ({
  useYear: () => ({
    registerYear: registerYearMock,
    updateYear: updateYearMock,
    loading: false,
    selectedYear: null,
  }),
}));

// Mock de alert
vi.spyOn(window, "alert").mockImplementation(() => {});

const renderCreateYearView = () =>
  render(
    <MemoryRouter>
      <ToasterProvider>
        <YearProvider>
          <CreateYearView />
        </YearProvider>
      </ToasterProvider>
    </MemoryRouter>
  );

describe("CreateYearView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("Escenario 1: crear un año valido", async () => {
    // Arrange
    const { useYear } = await import("../../../../admin/hooks/useYear");
    const registerYearMock = useYear().registerYear as Mock;

    renderCreateYearView();

    // Act
    const input = screen.getByPlaceholderText("Ej: Primer Año");
    fireEvent.change(input, { target: { value: "septimo" } });

    const button = screen.getByRole("button", { name: /crear año/i });
    fireEvent.click(button);

    // Assert
    await waitFor(() => {
      expect(registerYearMock).toHaveBeenCalledWith({ name: "septimo" });
      expect(window.alert).toHaveBeenCalledWith("Año creado exitosamente.");
      expect(input).toHaveValue(""); // se limpia el form
    });
  });

  it("Escenario 2: validar capo vacio", async () => {
    const { useYear } = await import("../../../../admin/hooks/useYear");
    const registerYearMock = useYear().registerYear as Mock;

    renderCreateYearView();

    const input = screen.getByPlaceholderText("Ej: Primer Año");
    fireEvent.change(input, { target: { value: "" } });

    const button = screen.getByRole("button", { name: /crear año/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(registerYearMock).not.toHaveBeenCalled();
    });
  });

  it("Escenario 3: validar longitud maxima (50 caracteres)", async () => {
    const { useYear } = await import("../../../../admin/hooks/useYear");
    const registerYearMock = useYear().registerYear as Mock;

    render(
      <MemoryRouter>
        <ToasterProvider>
          <CreateYearView />
        </ToasterProvider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Ej: Primer Año");
    const longName = "A".repeat(51); // 51 caracteres
    fireEvent.change(input, { target: { value: longName } });

    const button = screen.getByRole("button", { name: /crear año/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(registerYearMock).not.toHaveBeenCalled();
      // expect(window.alert).toHaveBeenCalledWith("El nombre no puede superar 50 caracteres");
    });
  });

  it("Escenario 4: validar caracteres inválidos", async () => {
    const { useYear } = await import("../../../../admin/hooks/useYear");
    const registerYearMock = useYear().registerYear as Mock;

    renderCreateYearView();

    const input = screen.getByPlaceholderText("Ej: Primer Año");
    fireEvent.change(input, { target: { value: "2025" } });

    const button = screen.getByRole("button", { name: /crear año/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(registerYearMock).not.toHaveBeenCalled(); //El test pasa cuando no se llama al register. En este caso falla porque si se llama
      // Si el componente muestra alert o mensaje de error:
      // expect(window.alert).toHaveBeenCalledWith(
      //   "El nombre debe contener solo letras"
      // );
    });
  });
});
