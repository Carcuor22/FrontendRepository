import { useState } from "react";
import { apiUrl } from "../config";
import { Typography, TextField, Box, Button, Card, CardContent } from "@mui/material";

function ListadoProyectosFiltrado() {
  const [rows, setRows] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const fetchProyectos = async () => {
    let url = `${apiUrl}/proyectos/filtrar?`;
    if (nombreProyecto) url += `nombre=${nombreProyecto}&`;
    
    // ✅ Enviar las fechas correctamente como rango
    if (fechaInicio) url += `fecha_inicio=${fechaInicio}&`;
    if (fechaFin) url += `fecha_fin=${fechaFin}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setRows(data.datos);
      } else {
        setRows([]); 
      }
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      setRows([]);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Filtrar Proyectos
      </Typography>

      <Box sx={{ mx: 4, mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nombre del Proyecto"
          variant="outlined"
          value={nombreProyecto}
          onChange={(e) => setNombreProyecto(e.target.value)}
          fullWidth
        />
        <TextField
          label="Fecha Inicio"
          type="date"
          variant="outlined"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha Fin"
          type="date"
          variant="outlined"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={fetchProyectos} sx={{ mt: 1 }}>
          Buscar
        </Button>
      </Box>

      {rows.length > 0 ? (
        <Box sx={{ mx: 4, mt: 2 }}>
          {rows.map((proyecto) => (
            <Card key={proyecto.id_proyecto} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{proyecto.nombre}</Typography>
                <Typography variant="body2">{proyecto.descripcion}</Typography>
                <Typography variant="body2">
                  Inicio: {proyecto.fecha_inicio} - Fin: {proyecto.fecha_fin}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography align="center" sx={{ mt: 2 }}>
          No se encontraron proyectos con esos filtros.
        </Typography>
      )}
    </>
  );
}

export default ListadoProyectosFiltrado;
