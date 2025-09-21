import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateCourseView from "../../../../admin/views/Course/CreateCourseView";
import { CourseProvider } from "../../../../admin/contexts/courseContext/CourseProvider";
import { ToasterProvider } from "../../../../shared/contexts/toasterContext/ToasterProvider";
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ id: 1 }),
  };
});

// ----- Mocks del hook de cursos -----
const updateCourseMock = vi.fn();
vi.mock("../../../../admin/hooks/useCourse", () => ({
  useCourse: () => ({
    updateCourse: updateCourseMock,
    loading: false,
    selectedCourse: null,
  }),
}));

const getYearMock = vi.fn();
vi.mock("../../../../admin/hooks/useYear", () => ({
  useYear: () => ({
    years: [
      { id: 1, name: "Primero" },
      { id: 2, name: "Segundo" },
    ],
    getYear: getYearMock,
    loading: false,
  }),
}));

// ----- Mock de alert -----
vi.spyOn(window, "alert").mockImplementation(() => {});

const renderCreateCourseView = () =>
  render(
    <MemoryRouter>
      <ToasterProvider>
        <CourseProvider>
          <CreateCourseView />
        </CourseProvider>
      </ToasterProvider>
    </MemoryRouter>
  );

describe("CreateCourseView (EDIT)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Escenario 6: Editar el nombre de un curso existente", async () => {
    const { useCourse } = await import("../../../../admin/hooks/useCourse");
    const updateCourseMock = useCourse().updateCourse as Mock;

    renderCreateCourseView();

    fireEvent.change(screen.getByRole("combobox"), {
      //Cargamos el input con el year
      target: { value: 1 },
    });

    const input = screen.getByPlaceholderText("Nombre del curso. Ejemplo: A");
    fireEvent.change(input, { target: { value: "F" } });

    const button = screen.getByRole("button", { name: /actualizar curso/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(updateCourseMock).toHaveBeenCalledWith({
        name: "F",
        id: 1,
        year_id: 1,
      });
    });
    expect(
      screen.getByText("El curso ha sido actualizado exitosamente")
    ).toBeInTheDocument();
  });

  it("Escenario 7: Intentar modificar el año de un curso", async () => {
    renderCreateCourseView();

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled(); // el año no editable
  });
});
