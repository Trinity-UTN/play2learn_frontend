import { GameType } from "../../types/Games.type";
import type { GameConfigRenderer } from "../../strategies/interfaces/GameConfigRenderer.interface";
import { AhorcadoConfigRenderer } from "../../strategies/renderers/AhorcadoConfigRenderer";
import { CompletarOracionConfigRenderer } from "../../strategies/renderers/CompletarOracionConfigRenderer";
import { DesafioClasificacionConfigRenderer } from "../../strategies/renderers/DesafioClasificacionConfigRenderer";
import { PreguntadosConfigRenderer } from "../../strategies/renderers/PreguntadosConfigRenderer";
import { MemoramaConfigRenderer } from "../../strategies/renderers/MemoramaConfigRenderer";
import { OrdenarSecuenciaConfigRenderer } from "../../strategies/renderers/OrdenarSecuenciaConfigRenderer";
import { NoLudicaConfigRenderer } from "../../strategies/renderers/NoLudicaConfigRenderer";

export class GameConfigRendererRegistry {
  private static readonly renderers = new Map<GameType, GameConfigRenderer>([
    [GameType.AHORCADO, new AhorcadoConfigRenderer()],
    [GameType.COMPLETAR_ORACION, new CompletarOracionConfigRenderer()],
    [GameType.CLASIFICACION, new DesafioClasificacionConfigRenderer()],
    [GameType.MEMORAMA, new MemoramaConfigRenderer()],
    [GameType.NO_LUDICA, new NoLudicaConfigRenderer()],
    [GameType.ORDENAR_SECUENCIA, new OrdenarSecuenciaConfigRenderer()],
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
