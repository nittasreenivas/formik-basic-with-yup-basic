import { Formik } from "formik";
import * as Yup from "yup";
export default function StudentForm() {
  const studentSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "firstname should be more than 3 character")
      .required("firstname is mandatory"),
    graduation: Yup.string()
      .min(3, "graduation should be more than 3 character")
      .required("graduation is mandatory"),
    percentage: Yup.number()
      .test("abc", "percentage is not matching", function (a) {
        const { from, originalValue } = this;
        if (from[0].value.graduation === "b.tech") {
          if (originalValue <= 60) {
            return false;
          }
        }
        if (from[0].value.graduation === "m.tech") {
          if (originalValue <= 70) {
            return false;
          }
        }
        console.log("inside-function::", this);
        return true;
      })
      .min(70)
      .required("enter your percentage")
  });
  return (
    <div className="vasu">
      <h2> Student Fom</h2>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          graduation: "",
          percentage: ""
        }}
        validationSchema={studentSchema}
        onSubmit={(values, x) => {
          console.log("values::", values);
          console.log("x:::", x.resetForm());
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          errors
        }) => {
          console.log("touched", touched);
          return (
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="enter firstname"
                  name="firstname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstname}
                />
                <br />
                <div>
                  {errors && errors.firstname && touched.firstname && (
                    <b className="err">{errors.firstname} </b>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="enter lastname"
                  name="lastname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastname}
                />
                <br />
                <input
                  type="text"
                  placeholder="enter graduation"
                  name="graduation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.graduation}
                />
                <br />
                <div>
                  {errors && errors.graduation && touched.graduation && (
                    <b className="err">{errors.graduation} </b>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="enter percentage"
                  name="percentage"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.percentage}
                />
                <br />
                <div>
                  {errors && errors.percentage && touched.percentage && (
                    <b className="err">{errors.percentage} </b>
                  )}
                </div>
                <button type="submit">save</button>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}
