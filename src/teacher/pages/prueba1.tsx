import { useAuth } from "../../user/hooks/useAuth";

const Prueba1 = () => {
  const { logout } = useAuth();
  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <button onClick={logout}>cerrar sesion</button>
    </div>
  );
};
export default Prueba1;
