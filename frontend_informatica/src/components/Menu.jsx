import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);


  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <img src={logo} height="30" alt="" loading="lazy" />
          Empresa De Informatica
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Proyectos
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <Link to="/altaproyecto" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de proyectos</MDBDropdownItem>
                    </Link>
                  <Link to="/listadoproyectos" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de proyectos</MDBDropdownItem>
                  </Link>
                  <Link to="/busquedaproyectosid" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Busqueda de proyectos</MDBDropdownItem>
                  </Link>
                  <Link to="/listadoProyectosFiltrado" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Busqueda de proyectos parametrizado</MDBDropdownItem>
                  </Link>
                  <Link to="/listadoProyectosPaginados" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Busqueda de proyectos paginados</MDBDropdownItem>
                  </Link>
                  <Link to="/landpage" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Land Page</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Tareas
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/altatarea" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Alta de tareas</MDBDropdownItem>
                  </Link>
                  <Link to="/listadotareas" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Listado de tareas</MDBDropdownItem>
                  </Link>
                  <Link to="/busquedaTareasId" style={{ color: "#4f4f4f" }}>
                    <MDBDropdownItem link>Busqueda de tareas</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Menu;
