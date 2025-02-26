import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { apiUrl } from "../config";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";

function BusquedaProyectosId() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [idProyecto, setIdProyecto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getProyectos() {
      let response;

      // Si el idProyecto tiene valor, buscamos el proyecto por ID
      if (idProyecto) {
        response = await fetch(apiUrl + `/proyectos/${idProyecto}`);
      } else {
        response = await fetch(apiUrl + "/proyectos");
      }

      if (response.ok) {
        let data = await response.json();
        setRows([data.datos]); // Si solo hay un proyecto, lo guardamos en un array
        setFilteredRows([data.datos]); // Filtramos la respuesta
      } else {
        setFilteredRows([]); // Si no hay proyectos, limpiar la tabla
      }
    }

    getProyectos();
  }, [idProyecto]); // Se ejecuta cada vez que idProyecto cambia

  const handleDelete = async (id_proyecto) => {
    let response = await fetch(apiUrl + "/proyectos/" + id_proyecto, {
      method: "DELETE",
    });

    if (response.ok) {
      const proyectosTrasBorrado = filteredRows.filter(
        (proyecto) => proyecto.id_proyecto !== id_proyecto
      );
      setFilteredRows(proyectosTrasBorrado);
      setRows(rows.filter((proyecto) => proyecto.id_proyecto !== id_proyecto)); // Actualiza también el estado global
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Búsqueda de Proyectos por ID
      </Typography>

      <Box sx={{ mx: 4, mt: 2 }}>
        <TextField
          label="ID Proyecto"
          variant="outlined"
          value={idProyecto}
          onChange={(e) => setIdProyecto(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID PROYECTO</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>DESCRIPCIÓN</TableCell>
                <TableCell align="center">FECHA INICIO</TableCell>
                <TableCell align="center">FECHA FIN</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <TableRow key={row.id_proyecto}>
                    <TableCell align="right">{row.id_proyecto}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell align="center">{row.fecha_inicio}</TableCell>
                    <TableCell align="center">{row.fecha_fin}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(row.id_proyecto)}
                        color="error"
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate("/modificarProyecto/" + row.id_proyecto)
                        }
                        sx={{ ml: 2 }}
                      >
                        <EditNoteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron proyectos con ese ID.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default BusquedaProyectosId;
