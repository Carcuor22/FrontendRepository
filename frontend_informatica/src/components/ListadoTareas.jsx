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

function ListadoTareas() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [idProyecto, setIdProyecto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getTareas() {
      let response;

      if (idProyecto) {
        response = await fetch(apiUrl + `/tareas/buscarporid?id_proyecto=${idProyecto}`);
      } else {
        response = await fetch(apiUrl + "/tareas");
      }

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
        setFilteredRows(data.datos);
      } else {
        setFilteredRows([]); // Si no hay tareas, limpiar la tabla
      }
    }

    getTareas();
  }, [idProyecto]); // Se ejecuta cada vez que idProyecto cambia

  const handleDelete = async (id_tarea) => {
    let response = await fetch(apiUrl + "/tareas/" + id_tarea, {
      method: "DELETE",
    });

    if (response.ok) {
      const tareasTrasBorrado = filteredRows.filter(
        (tarea) => tarea.id_tarea !== id_tarea
      );
      setFilteredRows(tareasTrasBorrado);
      setRows(rows.filter((tarea) => tarea.id_tarea !== id_tarea)); // Actualiza también el estado global
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de tareas
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
        <Button variant="contained" sx={{ mb: 2 }}>
          Filtrar
        </Button>
      </Box>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDTAREA</TableCell>
                <TableCell>TITULO</TableCell>
                <TableCell>DESCRIPCIÓN</TableCell>
                <TableCell align="right">NOMBRE PROYECTO</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row) => (
                  <TableRow key={row.id_tarea}>
                    <TableCell align="right">{row.id_tarea}</TableCell>
                    <TableCell>{row.titulo}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell align="right">{row.proyecto.nombre}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(row.id_tarea)}
                        color="error"
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate("/modificarTarea/" + row.id_tarea)
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
                  <TableCell colSpan={5} align="center">
                    No se encontraron tareas para este proyecto.
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

export default ListadoTareas;
