import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

import "../assets/error.css";

// Yup validation setting, yup doc
let schema = yup.object().shape({
  name: yup.string().required("Name is Required"), //formik.touched
});
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import CustomInput from "components/CustomInput";
import { createTag } from "features/category/categorySlice";
import { resetState } from "features/Users/usersSlice";
import { toast } from "react-toastify";

function CreateTags() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authState = useSelector((state) => state);
  const categStae = useSelector((state) => state.category);
  const { isLoading, isError, createdCategory } = categStae;

  const { user } = authState.auth;
  const token = user?.data?.token;
  // Formik state, check doc
  const formik = useFormik({
    // initial form state
    initialValues: {
      name: "",
    },
    validationSchema: schema, // to validate the yup setup schema
    onSubmit: (values) => {
      const items = { name: values?.name, token };
      // console.log(items);
      // pass the value of the data got from formik to the login action
      dispatch(createTag(items));
      dispatch(resetState());
    },
  });
  // console.log(createdCategory);

  useEffect(() => {
    if (createdCategory) {
      toast.success("Tag Created Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isError, createdCategory]);

  return (
    <>
      <Container style={{ padding: "1rem 20rem" }} fluid>
        <Row className="px-5">
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create Tag</Card.Title>
              </Card.Header>
              <Card.Body>
                <form action="" onSubmit={formik.handleSubmit}>
                  <CustomInput
                    type="text"
                    label="Tag Name"
                    id="name"
                    name="name"
                    onChng={formik.handleChange("name")}
                    onBlr={formik.handleBlur("name")}
                    val={formik.values.name}
                  />
                  <div className="error mt-2">
                    {formik.touched.name && formik.errors.name}
                  </div>

                  <button
                    className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                    style={{ background: "blue" }}
                    type="submit"
                  >
                    {isLoading ? "Submittiing" : "Submit"}
                  </button>
                </form>
                {/* <Form>
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

                  <Button
                    className="btn-fill pull-right mt-3"
                    type="submit"
                    variant="info"
                  >
                    Submit
                  </Button>
                  <div className="clearfix"></div>
                </Form> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateTags;
