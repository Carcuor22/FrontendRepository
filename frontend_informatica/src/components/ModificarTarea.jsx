import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../config";

function ModificarTarea() {
  const params = useParams();
  const [datos, setDatos] = useState({
    id_tarea: params.id_tarea,
    titulo: "",
    descripcion: "",
    id_proyecto: "",
  });
  const [validacion, setValidacion] = useState({
    titulo: false, // true si hay error
    descripcion: false,
    id_proyecto: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getTareaById() {
      let response = await fetch(apiUrl + "/tareas/" + datos.id_tarea);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/"); // Volver a la página principal por ruta errónea
      }
    }

    getTareaById();
  }, [datos.id_tarea, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validarDatos()) {
      try {
        const response = await fetch(apiUrl + "/tareas/" + datos.id_tarea, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        if (response.ok) {
          alert("Actualización correcta");
          navigate(-1); // Volver a la ruta anterior
        } else {
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
    let validado = true;
    let validacionAux = {
      titulo: false,
      descripcion: false,
      id_proyecto: false,
    };

    // Validar título
    if (datos.titulo.length < 3) {
      validacionAux.titulo = true;
      validado = false;
    }

    // Validar descripción
    if (datos.descripcion.length < 10) {
      validacionAux.descripcion = true;
      validado = false;
    }

    // Validar id_proyecto (debe ser un número)
    if (!datos.id_proyecto || isNaN(parseInt(datos.id_proyecto))) {
      validacionAux.id_proyecto = true;
      validado = false;
    }

    setValidacion(validacionAux);
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
        Modificar tarea
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
              id="titulo"
              label="Título"
              variant="outlined"
              name="titulo"
              value={datos.titulo}
              onChange={handleChange}
              error={validacion.titulo}
              helperText={
                validacion.titulo && "Título incorrecto. Mínimo 3 caracteres"
              }
            />
            <TextField
              id="descripcion"
              label="Descripción"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
              onChange={handleChange}
              error={validacion.descripcion}
              helperText={
                validacion.descripcion &&
                "Descripción requerida. Mínimo 10 caracteres"
              }
            />
            <TextField
              id="id_proyecto"
              label="ID Proyecto"
              variant="outlined"
              name="id_proyecto"
              value={datos.id_proyecto}
              onChange={handleChange}
              error={validacion.id_proyecto}
              helperText={
                validacion.id_proyecto &&
                "ID del proyecto requerido. Debe ser un número válido"
              }
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

export default ModificarTarea;
