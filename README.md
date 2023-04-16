Autenticación y Autorización de usuarios usando JWT


● Permite el registro de nuevos usuarios a través de una ruta POST /usuarios
● Ofrece la ruta POST /login que recibe las credenciales de un usuario y devuelva un token generado con JWT. Se debe incluir el payload del token el email del usuario registrado.
● Disponibiliza una ruta GET /usuarios para devolver los datos de un usuario en caso de que esté autenticado, para esto:
  ○ Extraiga un token disponible en la propiedad Authorization de las cabeceras
  ○ Verifique la validez del token usando la misma llave secreta usada en su firma
  ○ Decodifique el token para obtener el email del usuario a buscar en su payload
  ○ Obtenga y devuelva el registro del usuario
