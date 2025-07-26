import CreateAhorcado from '../components/createAhorcado/CreateAhorcado';
import JuegoPrueba from '../components/juegoPrueba/JuegoPrueba';


export const activityComponentMap: Record<string, React.ComponentType> = {
    ahorcado_educativo: CreateAhorcado,
    completar_oraciones: JuegoPrueba,
};
