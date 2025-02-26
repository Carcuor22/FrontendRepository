import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router";
// Importamos las variables de entorno
import { apiUrl } from "../config";

function AltaTarea() {
  const [datos, setDatos] = useState({
    titulo: "", // Valor inicial definido
    descripcion: "", // Valor inicial definido
    id_proyecto: "", // Valor inicial definido para evitar errores no controlados
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevenimos el envío por defecto del formulario
    e.preventDefault();

    // Enviamos los datos al backend usando fetch
    try {
      const response = await fetch(apiUrl + "/tareas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos), // Convertimos los datos en JSON
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/"); // Volver a la página principal
        }
      } else {
        alert("Error al crear la tarea.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Alta de Tareas
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
              label="Titulo"
              variant="outlined"
              name="titulo"
              value={datos.titulo}
              onChange={handleChange}
            />
            <TextField
              id="descripcion"
              label="Descripcion"
              variant="outlined"
              name="descripcion"
              value={datos.descripcion}
              onChange={handleChange}
            />
            <TextField
              id="id_proyecto"
              type="number"
              label="Id Proyecto"
              variant="outlined"
              name="id_proyecto" // Campo corregido
              value={datos.id_proyecto} // Valor del estado
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

export default AltaTarea;
