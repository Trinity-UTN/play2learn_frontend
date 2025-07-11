export const AdminRoutes = {
  Overview: "overview",

  Courses: {
    Create: "courses/create",
    Edit: (id: string | number) => `courses/edit/${id}`,
    List: "courses/list",
  },

  Students: {
    Create: "students/create",
    Edit: (id: string | number) => `students/edit/${id}`,
    List: "students/list",
  },

  Years: {
    Create: "years/create",
    Edit: (id: string | number) => `years/edit/${id}`,
    List: "years/list",
  },

  Teachers: {
    Create: "teachers/create",
    Edit: (id: string | number) => `teachers/edit/${id}`,
    List: "teachers/list",
  },

  Subjects: {
    Create: "subjects/create",
    Edit: (id: string | number) => `subjects/edit/${id}`,
    List: "subjects/list",
  },
};

export default AdminRoutes;
