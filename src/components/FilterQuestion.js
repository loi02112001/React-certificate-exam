import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { DIFFICULTY_SELECT_LIST } from "../utils/Constant";

const FilterQuestion = ({
  categories,
  isSubmitting,
  onSubmit,
}) => {
  const initForm = {
    categoryId: "",
    difficulty: "",
  };

  const validationForm = Yup.object({
    categoryId: Yup.number().required("Required"),
    difficulty: Yup.string().required("Required"),
  });

  const handleSubmitForm = async (values) => {
    await onSubmit({
      categoryId: values.categoryId,
      difficulty: values.difficulty,
    });
  };

  return (
    <Formik
      initialValues={initForm}
      validationSchema={validationForm}
      onSubmit={handleSubmitForm}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={5}>
                <Form.Group>
                  <Form.Control
                    size="md"
                    as="select"
                    id="categorySelect"
                    name="categoryId"
                    value={values.categoryId}
                    isInvalid={Boolean(touched.categoryId && errors.categoryId)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                  {!!touched.categoryId && (
                    <>
                      <Form.Control.Feedback type="invalid">
                        {errors.categoryId}
                      </Form.Control.Feedback>
                    </>
                  )}
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Control
                    size="md"
                    as="select"
                    id="difficultySelect"
                    name="difficulty"
                    value={values.difficulty}
                    isInvalid={Boolean(touched.difficulty && errors.difficulty)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select difficulty
                    </option>
                    {DIFFICULTY_SELECT_LIST.map((difficulty, index) => (
                      <option key={index} value={difficulty.value}>
                        {difficulty.option}
                      </option>
                    ))}
                  </Form.Control>
                  {!!touched.difficulty && (
                    <>
                      <Form.Control.Feedback type="invalid">
                        {errors.difficulty}
                      </Form.Control.Feedback>
                    </>
                  )}
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button
                  id="createBtn"
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                >
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default FilterQuestion;
