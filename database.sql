-- Crear la base de datos 'pfc'
create database pfc;

-- Conectar a la base de datos 'pfc'
use pfc;

-- Crear tablas

create table tipoIncidencia (
	codigo int not null auto_increment,
	nombre varchar(300),
	etiquetas varchar(300),
	tipoDescripcion varchar(400),
	primary key (codigo)
);
create table ayuntamiento(
	codigo int not null auto_increment,
	nombre varchar(300),
	logo varchar(300),
	primary key (codigo)
);
create table rolUsuario (
	codigo int not null auto_increment,
	nombre varchar(300),
	primary key (codigo)
);
create table usuario (
	codigo int not null auto_increment,
	email varchar(300),
	password varchar(300),
	tipoDocumento varchar(10),
	ayuntamiento int,
	telefono varchar(30),
	nombre varchar(300),
	apellidos varchar(300),
	rolUsuario int,
	primary key (codigo),
	foreign key (ayuntamiento) references ayuntamiento(codigo),
	foreign key (rolUsuario) references rolUsuario(codigo)
);
create table incidencia(
	codigo int not null auto_increment,
	titulo varchar(300),
	descripcion varchar(99999),
	zona varchar(300),
	direccion varchar(999),
	tipoIncidencia int,
	prioridad varchar(300),
	estado varchar(300),
	codigoUsuario int,
	fecha datetime,
	fechaResolucion datetime,
	latitud float,
	longitud float,
	primary key (codigo),
	foreign key (tipoIncidencia) references tipoIncidencia(codigo),
	foreign key (codigoUsuario) references usuario(codigo)
);

create table notificacion(
	codigo int not null auto_increment,
	usuario int,
	asunto varchar(300),
	texto varchar(800),
	fecha datetime,
	primary key (codigo),
	foreign key (usuario) references usuario(codigo)
);


-- Insertar datos por defecto

insert into ayuntamiento (
	codigo,nombre,logo
) values (
	null,
	'Ayuntamiento ejemplo',
	null
);
insert into rolUsuario (
	codigo,nombre
) values (
	null,
	'Administrador'
);
insert into rolUsuario (
	codigo,nombre
) values (
	null,
	'Usuario'
);
insert into rolUsuario (
	codigo,nombre
) values (
	null,
	'Empleado'
);
insert into usuario (
	codigo,email,password,tipoDocumento,ayuntamiento,telefono,nombre,apellidos,rolUsuario
) values (
	null,
	"admin@example.com",
	'$2y$10$AVwNTqmyT4Wpv34.FGRM7u.P660cEVgbUjsHIzd3MHAdFx8S00pXm',-- "administracion"
	"DNI",
	1,
	'+34 890 123 456',
	'Admin',
	'',
	1
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'General',
	'#general',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Cultura',
	'#cultura',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Educación',
	'#educacion',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Deportes',
	'#deportes',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Gestiones municipales',
	'#gestionesMunicipales',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Hacienda',
	'#hacienda',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Información y atención al ciudadano',
	'#informacion #atencion',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Trámites',
	'#tramites',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Mantenimiento del espacio urbano',
	'#mantenimiento',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Movilidad',
	'#movilidad',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Ocio/tiempo libre',
	'#ocio',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Seguridad/prevención',
	'#seguridad #prevencion',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Economia/comercio/mercados',
	'#economia #comercio',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Recogida y limpieza del espacio urbano',
	'#limpieza',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Sanidad y salud pública',
	'#sanidad #salud',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Servicios funerarios y cementerios',
	'#funeraria #cementerios',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Servicios sociales',
	'#serviciosSociales',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Transportes públicos',
	'#transporte',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Urbanismo y obras',
	'#urbanismo #obras',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Agradecimientos',
	'#agradecimientos',
	''
);
insert into tipoIncidencia (
	codigo,nombre,etiquetas,tipoDescripcion
)values(
	null,
	'Medio ambiente',
	'#medioAmbiente',
	''
);


-- Fin.
