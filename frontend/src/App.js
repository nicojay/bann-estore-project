import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import MapScreen from './screens/MapScreen';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {' '}
            <h2>Categories</h2>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column text-white w-100 p-2">
            <h5>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={`/search?category=${category}`}
                    onClick={() => setShow(false)}
                  >
                    <Nav.Link>{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </h5>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
          <Container>
            <Button variant="dark" onClick={handleShow}>
              <i className="fas fa-bars"></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img className="logo" src="../images/logo.png" alt="logo"></img>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="me-auto w-100  justify-content-end navname">
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className=" nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                <Link to="/cart" className="nav-link">
                  <i className="fas fa-shopping-cart"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="info">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MapScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <Row>
            <Col className="footer-box" xs={12} md={4} m>
              <h6>About Us</h6>
              <div className="logo">
                <img className="logo" src="../images/logo.png" alt="logo"></img>
                <img
                  className="logo"
                  src="../images/companylogo.png"
                  alt="logo"
                ></img>
              </div>
              <p>
                BANN Assistive Tech Store is an online ecommerce store owned by
                BANN Technologies. With the advancements in technologies, we are
                producing smart products that can help persons with
                disabilities.{' '}
              </p>
            </Col>
            <Col className="footer-box" xs={12} md={4}>
              <h6>Social Media Links</h6>
              <Row>
                <Col xs={1}>
                  <i className="fab fa-facebook-square"></i>
                </Col>
                <Col>
                  <a href="https://web.facebook.com/BANNAssistiveTechStore/">
                    <p> @BANNAssistiveTechStore</p>
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <i className="fab fa-youtube"></i>
                </Col>
                <Col>
                  <a href="https://www.youtube.com/channel/UCEOltZ1aG_D2l35Mtm4BmBA">
                    <p> BANN Technologies</p>
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <i className="fab fa-instagram"></i>
                </Col>
                <Col>
                  <a href="https://www.instagram.com/banntechnologies/">
                    <p> @banntechnologies</p>
                  </a>
                </Col>
              </Row>
            </Col>
            <Col className="footer-box" xs={12} md={4}>
              <h6>Get in Touch</h6>
              <Row>
                <Col xs={1}>
                  <i className="fas fa-map-marker-alt"></i>
                </Col>
                <Col>
                  <a href="https://www.google.com/maps/@6.9516173,122.0807407,55m/data=!3m1!1e3!5m1!1e4">
                    <p>
                      {' '}
                      Luyahan, Pasonanca, Zamboanga City, Philippines, 7000
                    </p>
                  </a>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <i className="fas fa-phone-alt"></i>
                </Col>
                <Col>
                  <p> +639280404296</p>
                </Col>
              </Row>
              <Row>
                <Col xs={1}>
                  <i className="fas fa-envelope"></i>
                </Col>
                <Col>
                  <a href="https://www.gmail.com/">
                    {' '}
                    <p>bannassistivetechstore@gmail.com</p>{' '}
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            <div className="copyright">
              All rights reserved. Copyright &copy; 2022 BANN Assistive Tech
              Store
            </div>
          </Row>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
