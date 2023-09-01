import React, { useEffect } from "react";

import moment from "moment";
// react-bootstrap components
import { Button, Card, Container, Row, Col, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeUserRole } from "features/Users/usersSlice";
import { resetState } from "features/Users/usersSlice";
import { getAUser } from "features/Users/usersSlice";
import { getAUserPosts } from "features/Post/postSlice";
import { suspendAUser } from "features/Users/usersSlice";

function User() {
  //
  const userDataToken = useSelector((state) => state.auth.user);
  const token = userDataToken?.data?.token;
  //
  // const user = false;
  // const creator = true;
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  // console.log(id);

  // Prev
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);
  const auserPostsState = useSelector((state) => state.post);

  const { isSuccess, isError, isLoading, user, updatedRole, suspendAU } =
    userState;
  const { aUserPosts } = auserPostsState;

  useEffect(() => {
    if (isSuccess && updatedRole) {
      toast.success("Role Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, updatedRole]);
  useEffect(() => {
    if (isSuccess && suspendAU) {
      toast.success("Creator Suspended!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, suspendAU]);

  useEffect(() => {
    const ids = { id, token };
    dispatch(resetState());
    dispatch(getAUser(ids));
  }, [id, updatedRole]);

  useEffect(() => {
    const ids = { id, token };
    // dispatch(resetState());
    dispatch(getAUserPosts(ids));
  }, [id]);

  console.log(suspendAU);

  return (
    <>
      <Container fluid>
        <Row>
          {user?.role === "user" && (
            <Col md="8">
              <Row>
                <Card className="strpied-tabled-with-hover">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">
                        List of Posts Commented on
                      </Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Author</th>
                          <th className="border-0">comment</th>
                          <th className="border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Niger</td>
                          <td>Dakota Rice</td>
                          <td>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maxime mollitia, molestiae quas vel sint
                            commodi repudiandae consequuntur voluptatum laborum
                            numquam
                          </td>
                          <td>Dakota Rice</td>
                        </tr>
                        <tr>
                          <td>Niger</td>
                          <td>Dakota Rice</td>
                          <td>Dakota Rice</td>
                          <td>Dakota Rice</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Card className="strpied-tabled-with-hover mr-3">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">All Liked Posts</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Author</th>
                          <th className="border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Niger</td>
                          <td>Dakota Rice</td>
                          <td>Dakota Rice</td>
                        </tr>
                        <tr>
                          <td>Niger</td>
                          <td>Dakota Rice</td>
                          <td>Dakota Rice</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
                <Card className="strpied-tabled-with-hover">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">List of bookmarks</Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Niger</td>
                          <td>Dakota Rice</td>
                        </tr>
                        <tr>
                          <td>Niger</td>
                          <td>Dakota Rice</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          )}

          {user?.role === "creator" && (
            <Col md="8">
              <Row>
                <Card className="strpied-tabled-with-hover">
                  <Card.Header className="d-flex justify-content-between">
                    <div>
                      <Card.Title as="h4">
                        List of Posts Commented on
                      </Card.Title>
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Title</th>
                          <th className="border-0">Author</th>
                          <th className="border-0">no comment</th>
                          <th className="border-0">no of likes</th>
                          <th className="border-0">bible ref.</th>
                          <th className="border-0">date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aUserPosts?.map((post, i) => (
                          <tr key={i}>
                            <td>{post?.title}</td>
                            <td>{post?.User?.username}</td>
                            <td>{post?.CommentCount}</td>
                            <td>{post?.likeCount}</td>
                            <td>{post?.bible_book}</td>
                            <td>{moment(post?.createdAt).format("L")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          )}
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">{user?.username}</h5>
                  </a>
                  <p className="description">Email: {user?.email}</p>
                  <p className="description">
                    Phone No. {user?.phone ? user?.phone : "N/A"}
                  </p>
                  <p className="description">Date Joined: 12/09/2023</p>
                </div>
                <div className="description text-center">
                  {/* <div>no of likes, no of comments, no of bookmarks</div> */}
                  <span className="mx-1 text-info">likes: 15</span> |{" "}
                  <span className="mx-1 text-muted">comments: 15</span> |{" "}
                  <span className="mx-1 text-warning">bookmarks: 15</span>
                </div>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto my-3">
                {user?.role === "user" && (
                  <Button
                    className="btn-outlined btn-icon"
                    // href="#"
                    // onClick={(e) => e.preventDefault()}
                    variant="info"
                    onClick={() => {
                      const ids = { id, token };
                      dispatch(changeUserRole(ids));
                    }}
                  >
                    {/* <i className="fab fa-facebook-square"></i> */}
                    Make A Creator
                  </Button>
                )}
                {user?.role === "creator" && !user?.status ? (
                  <Button
                    className="btn-outlined btn-icon"
                    // href="#"
                    onClick={() => {
                      const ids = { id, token };
                      dispatch(suspendAUser(ids));
                    }}
                    variant="warning"
                  >
                    {/* <i className="fab fa-twitter"></i> */}
                    Suspend creator
                  </Button>
                ) : (
                  <Button
                    className="btn-outlined btn-icon"
                    // href="#"
                    onClick={() => {
                      const ids = { id, token };
                      // dispatch(suspendAUser(ids));
                    }}
                    variant="warning"
                  >
                    {/* <i className="fab fa-twitter"></i> */}
                    Unsuspend creator
                  </Button>
                )}
                {/* <Button
                  className="btn-outlined btn-icon"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button> */}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;

{
  /* <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Company (disabled)</label>
                        <Form.Control
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card> */
}
