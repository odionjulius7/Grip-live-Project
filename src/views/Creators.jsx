import { getUsers } from "features/Users/usersSlice";
import { getCreatorUsers } from "features/Users/usersSlice";
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
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Creators() {
  // user token
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // user token

  const [num, setNum] = useState(1);
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  let data2 = usersState?.creators?.data;
  data2 = data2?.filter((user) => user?.role === "creator" && !user?.status);

  useEffect(() => {
    const nums = { num, token };
    dispatch(resetState());
    dispatch(getCreatorUsers(nums));
  }, [num]);

  // console.log(data2);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Creators' List</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {/* <th className="border-0">ID</th> */}
                      <th className="border-0">Creator Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Phone No.</th>
                      <th className="border-0">No. Content</th>
                      <th className="border-0">Date Assigned</th>
                      <th className="border-0">Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data2?.map((user, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <Link to={`/admin/user/${user.id}`}>
                              {user.username}
                            </Link>
                          </td>
                          <td>{user.email}</td>
                          <td>{!user?.phone ? "N/A" : user?.phone}</td>
                          <td>{"4"}</td>
                          <td>{moment(user.updatedAt).format("L")}</td>
                          <td>{moment(user.createdAt).format("L")}</td>
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
}

export default Creators;
