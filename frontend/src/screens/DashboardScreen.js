import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AOS from 'aos';
import 'aos/dist/aos.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardScreen() {
  const dailysalesframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625cd35b-706a-43cd-80cd-caa8474a7124&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const monthlysalesframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625f8d6f-ec98-41eb-8fc3-0a707f8bbb3a&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const bestsellingframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625f9053-a8b5-4427-8459-0412e86bdee7&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const highestratingframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625f9b32-a8b5-432a-870f-0412e86f2e68&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const mostreviewsframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=2c058be6-9a44-439d-8f0d-12b8031b65e1&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const categoriesframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625cdb50-0b8a-4ec7-812f-336b6de20122&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const stocksframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625cdf97-8858-4ffe-8278-eda326b7712e&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';

  const usersframe =
    '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="100%" height="480" src="https://charts.mongodb.com/charts-project-0-iqkdn/embed/charts?id=625cdce6-0b8a-4e58-8b9d-336b6de27372&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>';
  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: props.iframe ? props.iframe : '',
        }}
      />
    );
  }
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>BANN - Admin Dashboard</title>
      </Helmet>
      <h1 data-aos="fade">Dashboard</h1>
      <hr></hr>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <div className="box">
                <Row>
                  <Col>
                    <i class="fas fa-dollar-sign"></i>
                  </Col>
                  <Col>
                    <strong>
                      ₱
                      {summary.orders && summary.users[0]
                        ? summary.orders[0].totalSales.toFixed(2)
                        : 0}
                    </strong>

                    <p>Total Sales</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={3}>
              <div className="box">
                <Row>
                  <Col>
                    <i class="fas fa-shopping-bag"></i>
                  </Col>
                  <Col>
                    <strong>
                      {summary.orders && summary.users[0]
                        ? summary.orders[0].numOrders
                        : 0}
                    </strong>
                    <p>Total Orders</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={3}>
              <div className="box">
                <Row>
                  <Col>
                    <i class="fas fa-shopping-basket"></i>
                  </Col>
                  <Col>
                    <strong>
                      {summary.products && summary.users[0]
                        ? summary.products[0].numProducts
                        : 0}
                    </strong>

                    <p>Total Products</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={3}>
              <div className="box">
                <Row>
                  <Col>
                    <i class="fas fa-users"></i>
                  </Col>
                  <Col>
                    <strong>
                      {summary.users && summary.users[0]
                        ? summary.users[0].numUsers
                        : 0}{' '}
                    </strong>
                    <p>Total Users</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div className="my-3">
            <Row>
              <div data-aos="fade" className="text-container">
                <h2>Sales Summary</h2>
              </div>

              <Col sm={12} md={6} data-aos="fade-up">
                {summary.dailyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Iframe iframe={dailysalesframe} />
                )}
              </Col>
              <Col sm={12} md={6} data-aos="fade-up">
                {summary.dailyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Iframe iframe={monthlysalesframe} />
                )}
              </Col>
            </Row>
            <Row>
              <div data-aos="fade" className="text-container">
                <h2>Products Summary</h2>
              </div>
              <Col sm={12} md={12} data-aos="fade-up">
                <Iframe iframe={bestsellingframe} />
              </Col>
              <Col sm={12} md={6} data-aos="fade-up">
                <Iframe iframe={highestratingframe} />
              </Col>
              <Col sm={12} md={6} data-aos="fade-up">
                <Iframe iframe={mostreviewsframe} />
              </Col>
              <Col sm={12} md={6} data-aos="fade-up">
                <Iframe iframe={categoriesframe} />
              </Col>
              <Col sm={12} md={6} data-aos="fade-up">
                <Iframe iframe={stocksframe} />
              </Col>
            </Row>
            <Row>
              <div data-aos="fade" className="text-container">
                <h2>Users Summary</h2>
              </div>

              <Col data-aos="fade-up">
                <Iframe iframe={usersframe} />
              </Col>
            </Row>
          </div>
          <div className="my-3"></div>
        </>
      )}
    </div>
  );
}
