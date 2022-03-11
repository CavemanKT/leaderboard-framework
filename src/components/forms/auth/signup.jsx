import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="domain">Domain Name</label>
      <Field
        id="url"
        className={`form-control ${(errors.domain && touched.domain ? ' is-invalid' : '')}`}
        name="domain"
        type="url"
        placeholder='http://itch.io'
      />
      <ErrorMessage component="div" className="invalid-feedback" name="domain" />
    </div>
    <div className="form-group mt-2">
      <label htmlFor="email">Email</label>
      <Field
        id="email"
        className={`form-control ${(errors.email && touched.email ? ' is-invalid' : '')}`}
        name="email"
        type="text"
      />
      <ErrorMessage component="div" className="invalid-feedback" name="email" />
    </div>

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

{/* company profile */}
    <div className='mt-3'>
      <h5 className='text-center'>
        Company Profile
      </h5>
      <div className="form-group mt-3">
        <label htmlFor="founded">Founded in</label>
        <Field
          id="founded"
          className={`form-control ${(errors.founded && touched.founded ? ' is-invalid' : '')}`}
          name="founded"
          type="number"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="country" />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Country</label>
        <Field
          id="country"
          className={`form-control ${(errors.country && touched.country ? ' is-invalid' : '')}`}
          name="country"
          type="text"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="country" />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="category">Category</label>
        <Field
          id="category"
          className={`form-control ${(errors.category && touched.category ? ' is-invalid' : '')}`}
          name="category"
          type="text"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="category" />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="revenueModelType">Revenue Model Type</label>
        <Field
          id="revenueModelType"
          className={`form-control ${(errors.revenueModelType && touched.revenueModelType ? ' is-invalid' : '')}`}
          name="revenueModelType"
          type="text"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="revenueModelType" />
      </div>
    </div>



    <button className="btn btn-info mt-2" type="submit" disabled={isSubmitting}>Register</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const authSignupSchema = yup.object().shape({
  domain: yup.string().url().required('Required'),
  email: yup.string().email().required('Required'),
  password: yup.string().min(6).required('Required'),
  passwordConfirmation: yup.string().when('password', {
    is: (val) => (!!(val && val.length > 0)),
    then: yup.string().oneOf(
      [yup.ref('password')],
      'Both Password need to be the same'
    )
  }),
  founded: yup.number().min(4, 'please enter year of four digits'),
  country: yup.string().required('required'),
  category: yup.string().required('required'),
  revenueModelType: yup.string().required('required'),
})

const FormsAuthSignup = ({ onSubmit }) => (
  <Formik
    initialValues={{
      domain: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      founded: '',
      country: '',
      category: '',
      revenueModelType: ''
    }}
    validationSchema={authSignupSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)
FormsAuthSignup.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FormsAuthSignup