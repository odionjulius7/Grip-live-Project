import { getUsers } from "features/Users/usersSlice";
import { resetState } from "features/Users/usersSlice";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Users = () => {
  const [num, setNum] = useState(1);
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  let data2 = usersState?.users?.data;
  data2 = data2?.filter((user) => user?.role === "user" && !user?.status);
  // data2 = data2?.filter((user) => !user?.status);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getUsers(num));
  }, [num]);

  // Users

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users' List</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone No.</th>
                      <th className="border-0">Date Joined</th>
                      <th className="border-0">Role</th>
                      <th className="border-0">Assign Creator</th>
                      {/* <th className="border-0">Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {data2?.map((user, i) => {
                      return (
                        <tr key={i}>
                          {/* <td>{i + 1}</td> */}
                          <td>
                            <Link to={`/admin/user/${user.id}`}>
                              {user.username}
                            </Link>
                          </td>
                          <td>{user.email}</td>
                          <td>{!user?.phone ? "N/A" : user?.phone}</td>
                          <td>{moment(user.createdAt).format("L")}</td>
                          <td>{user.role}</td>
                          {/* <td>
                            {user.status ? (
                              <span className="text-danger">Suspended</span>
                            ) : (
                              <span className="text-success">Active</span>
                            )} */}
                          {/* </td> */}
                          <td>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-119603706">
                                  Assign As Creator
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="success"
                                // onClick={() => showModal(post?.id)}
                              >
                                <i
                                  style={{ fontSize: "1.4rem" }}
                                  className="fas fa-check"
                                ></i>
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <div className="my-4 text-right">
              <Button
                disabled={num <= 1 ? true : false}
                className="m-1"
                onClick={() => {
                  if (num > 1) setNum((prev) => prev - 1);
                }}
              >
                Prev
              </Button>
              <Button
                onClick={() => setNum((prev) => prev + 1)}
                className="m-1"
                disabled={data2?.length === 0}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Users;
