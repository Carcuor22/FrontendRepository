import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoProyectos() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProyectos() {
      let response = await fetch(apiUrl + "/proyectos");

      if (response.ok) {
        let data = await response.json();
        setRows(data.datos);
      }
    }

    getProyectos();
  }, []); // Se ejecuta solo en el primer renderizado

  const handleDelete = async (id_proyecto) => {
    let response = await fetch(apiUrl + "/proyectos/" + id_proyecto, {
      method: "DELETE",
    });

    if (response.ok) {
      // Utilizando filter creo un array sin el plato borrado
      const proyectosTrasBorrado = rows.filter(
        (proyecto) =>proyecto.id_proyecto != id_proyecto
      );
      // Establece los datos de nuevo para provocar un renderizado
      setRows(proyectosTrasBorrado);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de proyectos
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">IDPROYECTO</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>DESCRIPCIÓN</TableCell>
                <TableCell align="right">FECHA_INICIO</TableCell>
                <TableCell align="center">FECHA_FIN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id_proyecto}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.id_proyecto}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell align="right">{row.fecha_inicio}</TableCell>
                  <TableCell align="right">{row.fecha_fin}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.id_proyecto)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarProyecto/" + row.id_proyecto)}
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ListadoProyectos;
