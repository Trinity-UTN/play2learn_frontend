/// <reference types="vitest"/>
/// <reference types="Vite/client"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", //Definimos que vamos a trabajar con el DOM de js
    globals: true, //habilita todas las funciones de forma global, evitando que tenga que importar en cada .test.tsx
    setupFiles: ["./src/test/setupTests.ts"],
  },
});
