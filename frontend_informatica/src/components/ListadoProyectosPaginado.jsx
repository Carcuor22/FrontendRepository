import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, Button, TablePagination
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ListadoProyectos() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // Página actual (MUI usa base 0)
  const [rowsPerPage, setRowsPerPage] = useState(5); // Elementos por página
  const [totalRows, setTotalRows] = useState(0); // Total de proyectos
  const navigate = useNavigate();

  useEffect(() => {
    fetchProyectos();
  }, [page, rowsPerPage]); // Recargar cuando cambie la paginación

  const fetchProyectos = async () => {
    try {
      let response = await fetch(`${apiUrl}/proyectos/paginados?page=${page + 1}&limit=${rowsPerPage}`);
      let data = await response.json();
      if (response.ok) {
        setRows(data.datos.data);
        setTotalRows(data.datos.total);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
    }
  };

  const handleDelete = async (id_proyecto) => {
    let response = await fetch(`${apiUrl}/proyectos/${id_proyecto}`, { method: "DELETE" });

    if (response.ok) {
      setRows(rows.filter((proyecto) => proyecto.id_proyecto !== id_proyecto));
      setTotalRows(totalRows - 1);
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de Proyectos (Paginado)
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="tabla de proyectos">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID PROYECTO</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>DESCRIPCIÓN</TableCell>
                <TableCell align="right">FECHA INICIO</TableCell>
                <TableCell align="right">FECHA FIN</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id_proyecto}>
                    <TableCell align="right">{row.id_proyecto}</TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell align="right">{row.fecha_inicio}</TableCell>
                    <TableCell align="right">{row.fecha_fin}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" onClick={() => handleDelete(row.id_proyecto)} color="error">
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                      <Button variant="contained" onClick={() => navigate(`/modificarProyecto/${row.id_proyecto}`)} sx={{ ml: 1 }}>
                        <EditNoteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No se encontraron proyectos.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Box>
    </>
  );
}

export default ListadoProyectos;
