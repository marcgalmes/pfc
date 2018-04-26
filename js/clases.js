function Incidencia() {
	//Constructor clase incidencia
	this.codigo = null;
	this.titulo = null;
	this.tipoIncidencia = null;
	this.prioridad = null;
	this.estado = null;
	this.codigoUsuario = null;
	this.fecha = null;
	this.fechaResolucion = null;
	this.latitud = null;
	this.longitud = null;
}

function TipoIncidencia() {
	this.codigo = null;
	this.nombre = null;
	this.etiquetas = null;
	this.tipoDescripcion = null;
}

function Usuario() {
	this.codigo = null;
	this.email = null;
	this.tipoDocumento = null;
	this.ayuntamiento = null;
	this.telefono = null;
	this.nombre = null;
	this.apellidos = null;
	this.rolUsuario = null;
}

function RolUsuario() {
	this.codigo = null;
	this.nombre = null; 
}

function Ayuntamiento() {
	this.codigo = null;
	this.nombre = null;
	this.logo = null;
}

function Notificacion() {
	this.codigo = null;
	this.usuario = null;
	this.asunto = null;
	this.texto = null;
	this.fecha = null;
}
