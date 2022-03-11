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
      <div className="form-group">
        <label htmlFor="domain">Domain Name</label>
        <Field
          id="url"
          className={`form-control ${(errors.domain && touched.domain ? ' is-invalid' : '')}`}
          name="domain"
          type="url"
          placeholder="http://itch.io"
          disabled={toggle}
        />

        <ErrorMessage component="div" className="invalid-feedback" name="domain" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <Field
          id="email"
          className={`form-control ${(errors.email && touched.email ? ' is-invalid' : '')}`}
          name="email"
          type="email"
          disabled={toggle}
        />
        <ErrorMessage component="div" className="invalid-feedback" name="email" />
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

const accountUpdateSchema = yup.object().shape({
  domain: yup.string().url().required('Required'),
  email: yup.string().email().required('Required')
})

const FormsAccount = ({ onSubmit, user }) => (
  <Formik
    initialValues={{
      domain: user?.Profile?.domain,
      email: user?.email
    }}
    validationSchema={accountUpdateSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)

FormsAccount.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FormsAccount