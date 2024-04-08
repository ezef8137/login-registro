export class Usuario {
  nombre!: string;
  apellido!: string;
  dni!: number;
  telefono!: number;
  correo!: string;
  clave!: string;

  validarCorreoElectronico(): boolean {
    // Expresión regular para verificar el formato del correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(this.correo);
  }
}