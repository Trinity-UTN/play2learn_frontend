import { GameType } from "../../types/Games.type";
import type { GameConfigRenderer } from "../../strategies/interfaces/GameConfigRenderer.interface";
import { AhorcadoConfigRenderer } from "../../strategies/renderers/AhorcadoConfigRenderer";
import { DesafioClasificacionConfigRenderer } from "../../strategies/renderers/DesafioClasificacionConfigRenderer";
import { PreguntadosConfigRenderer } from "../../strategies/renderers/PreguntadosConfigRenderer";

export class GameConfigRendererRegistry {
  private static readonly renderers = new Map<GameType, GameConfigRenderer>([
    [GameType.AHORCADO, new AhorcadoConfigRenderer()],
    [GameType.CLASIFICACION, new DesafioClasificacionConfigRenderer()],
    [GameType.PREGUNTADOS, new PreguntadosConfigRenderer()],
  ]);

  static getRenderer(gameType: GameType): GameConfigRenderer | null {
    return this.renderers.get(gameType) || null;
  }

  static registerRenderer(
    gameType: GameType,
    renderer: GameConfigRenderer
  ): void {
    this.renderers.set(gameType, renderer);
  }

  static hasRenderer(gameType: GameType): boolean {
    return this.renderers.has(gameType);
  }

  static getAllSupportedGameTypes(): GameType[] {
    return Array.from(this.renderers.keys());
  }
}
