/*
Se recibe el token y en la primera linea se los desglosa
ya que esta conformado por <header>.<payload>.<signature> 
en el payload esta la info de la expiracion, entonces obtenemos esta data
y con el atob() decodificamos base64 y lo convertimos en un JSON.
En la linea siguiente obtenemos el tiempo acttual pero esta en milisegundo asi que lo convertimos en segundos.
Luego comparamos el tiempo de exp del token contra en actual sumado un bufferSeconds.
Si el exp del token es menor significa que expiro y devuelve true.
El bufferSecond se utiliza para manejar un margen de error, ya que si al token le queda un segundo se lo considera valido,
pero quizas justo al momento de llegar al back, para este ya expirto y tira un 401. Por lo tanto con el buffer si al 
token le queda 30 ya es considerado como expirado
*/
function isTokenExpired(token: string, bufferSeconds = 30): boolean {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= (now + bufferSeconds);
}

export default isTokenExpired;