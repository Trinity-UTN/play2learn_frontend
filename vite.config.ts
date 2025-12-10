/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", //Definimos que vamos a trabajar con el DOM de js
    globals: true, //habilita todas las funciones de forma global, evitando que tenga que importar en cada .test.tsx
    setupFiles: ["./src/test/setupTests.ts"],
  },
  resolve: {
    alias: {
      // Alias principal - apunta a src/
      "@": path.resolve(__dirname, "./src"),

      // Alias específicos para carpetas importantes
      "@admin": path.resolve(__dirname, "./src/admin"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
