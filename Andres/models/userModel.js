class User {
    constructor(id, nombre, correo_electronico, telefono, direccion, ciudad, pais, fecha_registro, estado) {
        this.id = id;
        this.nombre = nombre;
        this.correo_electronico = correo_electronico;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.fecha_registro = fecha_registro;
        this.estado = estado;
    }
}

export default User;
