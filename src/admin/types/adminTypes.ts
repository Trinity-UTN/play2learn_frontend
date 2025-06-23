export interface Course {
  name: string;
  year_id: number;
}

export interface Student {
  name: string;
  lastName: string;
  dni: number;
  email: string;
  class_id: number;
}

export interface Teacher {
  name: string;
  lastName: string;
  dni: number;
  email: string;
}

export interface Year {
  name: string;
}