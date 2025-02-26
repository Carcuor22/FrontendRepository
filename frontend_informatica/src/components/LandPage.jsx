import { useState, useEffect } from "react";
import { apiUrl } from "../config";
import {
  Typography, Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Card, CardContent, CardMedia
} from "@mui/material";
import Carousel from "react-material-ui-carousel";

function LandPage() {
  const [items, setItems] = useState([]); // Para el carrusel
  const [rows, setRows] = useState([]); // Para la tabla

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch(`${apiUrl}/proyectos`);
      let data = await response.json();
      if (response.ok) {
        setItems(data.datos.slice(0, 5)); // Los primeros 5 proyectos para el carrusel
        setRows(data.datos); // Todos los proyectos en la tabla
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  return (
    <Container>
    
      <Typography variant="h4" align="center" sx={{ mt: 3, mb: 2 }}>
        Proyectos Destacados
      </Typography>
      <Carousel sx={{ mb: 4 }}>
        {items.map((item) => (
          <Card key={item.id_proyecto} sx={{ maxWidth: 600, mx: "auto" }}>
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/600x400/?business,project" // Imagen aleatoria
              alt={item.nombre}
            />
            <CardContent>
              <Typography variant="h6">{item.nombre}</Typography>
              <Typography variant="body2">{item.descripcion}</Typography>
              <Typography variant="body2">
                {`Inicio: ${item.fecha_inicio} - Fin: ${item.fecha_fin}`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>

    
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Bienvenido a nuestra plataforma de gestión de proyectos.
        </Typography>
        <Typography variant="body1">
          Aquí puedes encontrar información sobre los proyectos en curso, su estado actual y detalles clave.
          Nuestra plataforma está diseñada para ayudarte a administrar tus tareas de manera eficiente.
        </Typography>
      </Box>

   
      <Typography variant="h4" align="center" sx={{ mt: 3, mb: 2 }}>
        Lista de Proyectos
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table aria-label="tabla de proyectos">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell>NOMBRE</TableCell>
              <TableCell>DESCRIPCIÓN</TableCell>
              <TableCell align="right">FECHA INICIO</TableCell>
              <TableCell align="right">FECHA FIN</TableCell>
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No se encontraron proyectos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

     
      <Box sx={{ textAlign: "center", py: 2, backgroundColor: "#f5f5f5" }}>
        <Typography variant="body2">
          © 2024 - Plataforma de Gestión de Proyectos. Todos los derechos reservados.
        </Typography>
      </Box>
    </Container>
  );
}

export default LandPage;
