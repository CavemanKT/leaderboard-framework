import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ errors, touched, isSubmitting }) => {
  const [toggle, setToggle] = useState(true)
  const handleEnable = () => {
    setToggle(!toggle)
  }
  return (
    <Form>
        <div className="form-group mt-2">
        <label htmlFor="password">Password</label>
        <Field
            id="password"
            className={`form-control ${(errors.password && touched.password ? ' is-invalid' : '')}`}
            name="password"
            type="password"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="password" />
        </div>

        <div className="form-group mt-2">
        <label htmlFor="passwordConfirmation">Confirmation</label>
        <Field
            id="passwordConfirmation"
            className={`form-control ${(errors.passwordConfirmation && touched.passwordConfirmation ? ' is-invalid' : '')}`}
            name="passwordConfirmation"
            type="password"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="passwordConfirmation" />
        </div>


      {
          toggle && (
            <div className="btn btn-info m-4" onClick={handleEnable}>modify</div>
          )
        }

      {
          !toggle && (
          <div className="btn btn-danger m-4" onClick={handleEnable}>disable</div>
          )
        }
      <button className="btn btn-success m-4" type="submit" disabled={isSubmitting || toggle}>Update</button>
    </Form>
  )
}


RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const passwordUpdateSchema = yup.object().shape({
  password: yup.string().min(6).required('Required'),
  passwordConfirmation: yup.string().when('password', {
    is: (val) => (!!(val && val.length > 0)),
    then: yup.string().oneOf(
      [yup.ref('password')],
      'Both Password need to be the same'
    )
  }),
})

const FormsPassowrd = ({ onSubmit }) => (
  <Formik
    initialValues={{
      passowrd: '',
      passwordConfirmation: ''
    }}
    validationSchema={passwordUpdateSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)

FormsPassowrd.propTypes = {
  onSubmit: PropTypes.func.isRequired
}


export default FormsPassowrd