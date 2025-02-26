import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

function ModificarProyecto() {
  const params = useParams();
  const [datos, setDatos] = useState({
    id_proyecto: params.id_proyecto,
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
  });
  const [validacion, setValidacion] = useState({
    nombre: false, // true si hay error
    descripcion: false,
    fecha_inicio: false,
    fecha_fin: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getProyectoId() {
      let response = await fetch(apiUrl + "/proyectos/" + datos.id_proyecto);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta erronea
      }
    }

    getProyectoId();
  }, [datos.id_proyecto, navigate]); // Se ejecuta solo en el primer renderizado

  const handleSubmit = async (e) => {
    // No hacemos submit
    e.preventDefault();
    console.log("Vamos a validar");
    if (validarDatos()) {
      // Enviamos los datos mediante fetch
      try {
        console.log("Vamos a hacer fetch");
        const response = await fetch(
          apiUrl + "/proyectos/" + datos.id_proyecto,
          {
            method: "PUT", // "PATCH"
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos), // JSON.stringify({blocked: true})
          }
        );

        if (response.ok) {
          // 204 No content
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
          // 404 Not Found plato no modificado o no encontrado
          const data = await response.json();
          alert(data.mensaje);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error:", error);
      }
    }
  };

  function validarDatos() {
    // En principio, damos por bueno el formulario
    let validado = true;
    // Estado de la validación auxiliar
    let validacionAux = {
      nombre: false,
      descripcion: false,
      fecha_inicio: false,
      fecha_fin: false,
    };

    if (datos.nombre.length < 3) {
      // Error en el nombre
      validacionAux.nombre = true;
      // Formulario invalido
      validado = false;
    }

    if (datos.descripcion.length < 10) {
      validacionAux.descripcion = true;
      validado = false;
    }

    let expFecha = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD

    // Validar fecha de inicio
    if (expFecha.test(datos.fecha_inicio)) {
      let fechaInicio = new Date(datos.fecha_inicio);
      if (isNaN(fechaInicio.getTime())) {
        validacionAux.fecha_inicio = true;
        validado = false;
      }
    } else {
      validacionAux.fecha_inicio = true;
      validado = false;
    }

    // Validar fecha de fin
    if (expFecha.test(datos.fecha_fin)) {
      let fechaFin = new Date(datos.fecha_fin);
      if (isNaN(fechaFin.getTime())) {
        validacionAux.fecha_fin = true;
        validado = false;
      }
    } else {
      validacionAux.fecha_fin = true;
      validado = false;
    }

    // Validar que la fecha de inicio no sea posterior a la fecha de fin
    if (!validacionAux.fecha_inicio && !validacionAux.fecha_fin) {
      let fechaInicio = new Date(datos.fecha_inicio);
      let fechaFin = new Date(datos.fecha_fin);
      if (fechaInicio > fechaFin) {
        validacionAux.fecha_inicio = true;
        validacionAux.fecha_fin = true;
        validado = false;
      }
    }

    // Actualizo el estado de la validacion de los Textfields
    setValidacion(validacionAux);
    console.log("Formulario valido:", validado);
    return validado;
  }
  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Modificar proyecto
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ mx: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              error={validacion.nombre}
              helperText={
                validacion.nombre && "Nombre incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
              onChange={handleChange}
              error={validacion.descripcion}
              helperText={
                validacion.descripcion &&
                "Descripción requerida. Minimo 10 caracteres"
              }
            />
            <TextField
              id="outlined-basic"
              type="date"
              label="Fecha_Inicio"
              variant="outlined"
              name="fecha_inicio"
              value={datos.fecha_inicio}
              onChange={handleChange}
              error={validacion.fecha_inicio}
              helperText={
                validacion.fecha_inicio &&
                "Fecha Invalida"
              }
            />
            <TextField
              id="outlined-basic"
              type="date"
              label="Fecha_Fin"
              variant="outlined"
              name="fecha_fin"
              value={datos.fecha_fin}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              Aceptar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarProyecto;
