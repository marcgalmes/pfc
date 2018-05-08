create database pfc;
use pfc;

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

-- inserts

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
	codigo,email,tipoDocumento,ayuntamiento,telefono,nombre,apellidos,rolUsuario
) values (
	null,
	"admin@example.com",
	"DNI",
	1,
	'+34 890 123 456',
	'Admin',
	null,
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
insert into incidencia (
	codigo,titulo,tipoIncidencia,prioridad,estado,
	codigoUsuario,fecha,fechaResolucion,latitud,longitud
)values (
	null,
	"Prueba: Incidencia iluminación y electricidad en calle Prueba, 20",
	1,
	"Normal",
	"Revisar",
	1,
	'2018-04-16 06:13:21', 
	'2018-04-30 00:00:00', 
	'1.23123213', 
	'22.324324234'
);



