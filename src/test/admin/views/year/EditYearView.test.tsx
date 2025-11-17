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
    useParams: () => ({ id: 1 }),
  };
});

const updateYearMock = vi.fn();
vi.mock("../../../../admin/hooks/useYear", () => ({
  useYear: () => ({
    updateYear: updateYearMock,
    loading: false,
    selectedYear: null,
  }),
}));

// Mock de alert
vi.spyOn(window, "alert").mockImplementation(() => {});

describe("CreateYearView (EDIT)", () => {
  it("Escenario 5: editar un año valido", async () => {
    const { useYear } = await import("../../../../admin/hooks/useYear");
    const updateYearMock = useYear().updateYear as Mock;

    render(
      <MemoryRouter>
        <ToasterProvider>
          <YearProvider>
            <CreateYearView />
          </YearProvider>
        </ToasterProvider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Ej: Primer Año");
    fireEvent.change(input, { target: { value: "Septimo" } });

    const button = screen.getByRole("button", { name: /Actualizar año/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(updateYearMock).toHaveBeenCalledWith({
        id: expect.any(Number),
        name: "Septimo",
      });

      expect(
        screen.getByText("El año ha sido actualizado exitosamente")
      ).toBeInTheDocument();
    });
  });

  it("Escenario 6: intentar editar con nombre duplicado", async () => {
    const { useYear } = await import("../../../../admin/hooks/useYear");
    const updateYearMock = useYear().updateYear as Mock;
    updateYearMock.mockRejectedValueOnce(new Error("Nombre duplicado"));
    render(
      <MemoryRouter>
        <ToasterProvider>
          <YearProvider>
            <CreateYearView />
          </YearProvider>
        </ToasterProvider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Ej: Primer Año");
    fireEvent.change(input, { target: { value: "Segundo" } });

    const button = screen.getByRole("button", { name: /Actualizar año/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(updateYearMock).toHaveBeenCalledWith({
        id: expect.any(Number),
        name: "Segundo",
      });
      // expect(updateYearMock).not.toHaveBeenCalled();
      expect(
        screen.getByText("Error al actualizar el año académico")
      ).toBeInTheDocument();
    });
  });
});
