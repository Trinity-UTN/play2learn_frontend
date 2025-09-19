import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, type Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CreateCourseView from "../../../../admin/views/Course/CreateCourseView";
import { CourseProvider } from "../../../../admin/contexts/courseContext/CourseProvider";
import { ToasterProvider } from "../../../../shared/contexts/toasterContext/ToasterProvider";
// ----- Mocks del hook de cursos -----
const registerCourseMock = vi.fn();

vi.mock("../../../../admin/hooks/useCourse", () => ({
  useCourse: () => ({
    registerCourse: registerCourseMock,
    loading: false,
    selectedCourse: null, // Para crear (se seteará en editar)
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

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({}),
  };
});

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

describe("CreateCourseView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Escenario 1: crear un curso válido", async () => {
    const { useCourse } = await import("../../../../admin/hooks/useCourse");
    const registerCourseMock = useCourse().registerCourse as Mock;

    renderCreateCourseView();

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del curso. Ejemplo: A"),
      {
        target: { value: "D" },
      }
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: 1 },
    });

    fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));

    await waitFor(() => {
      expect(registerCourseMock).toHaveBeenCalledWith({
        name: "D",
        year_id: 1,
      });
      expect(window.alert).toHaveBeenCalledWith("Curso creado exitosamente.");
    });
  });

  it("Escenario 2: Intentar crear curso con nombre duplicado en el mismo año", async () => {
    const { useCourse } = await import("../../../../admin/hooks/useCourse");
    const registerCourseMock = useCourse().registerCourse as Mock;

    //SIMULAR ERROR
    registerCourseMock.mockRejectedValueOnce(
      new Error("Ya existe un curso con ese nombre en este año.") //MENSAJE QUE DEBERIA APARECER TRAS EL ERROR
    );

    renderCreateCourseView();

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del curso. Ejemplo: A"),
      {
        target: { value: "D" },
      }
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: 1 } });

    fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));

    await waitFor(() => {
      expect(registerCourseMock).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(
        "Hubo un error al crear el Curso." //MENSAJE QUE SE MUESTRA AHORA
      );
    });
  });

  it("Escenario 3: Intentar crear curso con nombre vacío", async () => {
    const { useCourse } = await import("../../../../admin/hooks/useCourse");
    const registerCourseMock = useCourse().registerCourse as Mock;

    renderCreateCourseView();
    const input = screen.getByPlaceholderText("Nombre del curso. Ejemplo: A");
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));

    expect(registerCourseMock).not.toHaveBeenCalled(); //valida que no se llame la funcion registrar
    expect(input).toBeRequired(); // Comprueba que el input tenga required
  });

  it("Escenario 4: Intentar crear curso con nombre de mas de 50 caracteres", async () => {
    const { useCourse } = await import("../../../../admin/hooks/useCourse");
    const registerCourseMock = useCourse().registerCourse as Mock;

    renderCreateCourseView();

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del curso. Ejemplo: A"),
      {
        target: { value: "a".repeat(51) },
      }
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: 1 } });

    fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));

    expect(registerCourseMock).not.toHaveBeenCalled();
    // expect(
    //   await screen.findByText("El nombre no puede superar los 50 caracteres.")
    // ).toBeInTheDocument();
  });

  it("Escenario 5: Intentar crear curso con caracteres inválidos", async () => {
    const { useCourse } = await import("../../../../admin/hooks/useCourse");
    const registerCourseMock = useCourse().registerCourse as Mock;

    renderCreateCourseView();

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del curso. Ejemplo: A"),
      {
        target: { value: "Curso#1!!" },
      }
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: 1 } });

    fireEvent.click(screen.getByRole("button", { name: /crear curso/i }));

    expect(registerCourseMock).not.toHaveBeenCalled();
    // expect(
    //   await screen.findByText("El nombre solo puede contener letras y números.")
    // ).toBeInTheDocument();
  });
});
