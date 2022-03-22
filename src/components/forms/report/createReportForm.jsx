import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => {
  const [pickedStage1Val, setPickedStage1Val] = useState(null)

  const handlePickedStage1Ref = (value) => {
    setPickedStage1Val(value)
    console.log(value)
  }

  return (
    <Form>
      <div role="group" aria-labelledby="my-radio-group1">
        <label className="m-3">
          <Field type="radio" name="pickedStage1" value="preRevenue" className="m-3" onClick={() => handlePickedStage1Ref('preRevenue')} />
          pre-revenue
        </label>
        <label className="m-3">
          <Field type="radio" name="pickedStage1" value="postRevenue" className="m-3" onClick={() => handlePickedStage1Ref('postRevenue')} />
          post-revenue
        </label>
        {
          errors.pickedStage1 && touched.pickedStage1 && (
            <div className='text-danger'>
              {errors.pickedStage1}
            </div>
          )
        }

      </div>
  
      {
        pickedStage1Val === 'preRevenue' && (
          <div>

            <div className="mt-4">Stage: </div>
            <div role="group" aria-labelledby="my-radio-group2">
              <div>
                <label>
                  <Field type="radio" name="pickedStage2" value="idea validation" className="m-3" />
                  idea validation
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="pickedStage2" value="product development" className="m-3" />
                  product development
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="pickedStage2" value="product live" className="m-3" />
                  product live
                </label>
              </div>
            </div>
              {
                errors.pickedStage2 && touched.pickedStage2 && (
                  <div className='text-danger'>
                    {errors.pickedStage2}
                  </div>
                )
              }

            <div className="form-group mt-5">
              <label htmlFor="totalWaitingList">Total waiting list</label>
              <Field
                placeholder="amount of emails collected"
                id="totalWaitingList"
                className={`w-50 form-control ${(errors.totalWaitingList && touched.totalWaitingList ? ' is-invalid' : '')}`}
                name="totalWaitingList"
                type="number"
              />
              <ErrorMessage component="div" className="invalid-feedback" name="totalWaitingList" />
            </div>
          </div>
        )
      }
  

      {
        pickedStage1Val === 'postRevenue' && (
          <div>
            <div className="form-group mt-5">
              <label htmlFor="revenueType" style={{ display: 'block' }}>
                Revenue Type
              </label>
              <select
                name="revenueType"
                value={values.revenueType}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ display: 'block' }}
              >
                <option value="" label="Select a revenue type" />
                <option value="MRR" label="MRR" />
                <option value="one time purchase" label="one time purchase" />
                <option value="mixed" label="mixed" />
              </select>
              {
                errors.revenueType && touched.revenueType && (
                  <div className="text-danger">
                    {errors.revenueType}
                  </div>
                )
              }
            </div>

            {
              values.revenueType == 'MRR' && (
                <div className="form-group mt-5">
                  <label htmlFor="MRR">MRR:</label>
                  <Field
                    name="MRR"
                    placeholder="$"
                    id="MRR"
                    className={`w-50 form-control ${(errors.MRR && touched.MRR ? ' is-invalid' : '')}`}
                    type="number"
                  />
                  <ErrorMessage component="div" className="invalid-feedback" name="MRR" />
                </div>
              )
            }
            {
              (values.revenueType == 'one time purchase' || values.revenueType == 'mixed') && (
                <div className="form-group mt-5">
                  <label htmlFor="Revenue">Revenue:</label>
                  <Field
                    name="Revenue"
                    placeholder="$"
                    id="Revenue"
                    className={`w-50 form-control ${(errors.Revenue && touched.Revenue ? ' is-invalid' : '')}`}
                    type="number"
                  />
                  <ErrorMessage component="div" className="invalid-feedback" name="Revenue" />
                </div>
              )
            }
          </div>
        )
      }
      <div className="mt-5">
        <div className="form-group mt-5">
          <label htmlFor="weeklyAchievement">What did you achieve this week?</label>
          <Field
            id="weeklyAchievement"
            className={`w-50 form-control ${(errors.weeklyAchievement && touched.weeklyAchievement ? ' is-invalid' : '')}`}
            name="weeklyAchievement"
            type="text"
            component="textarea"
          />
          <ErrorMessage component="div" className="invalid-feedback" name="weeklyAchievement" />
        </div>
        <div className="form-group mt-5">
          <label htmlFor="weeklyPlan">What are the plans for next week?</label>
          <Field
            id="weeklyPlan"
            className={`w-50 form-control ${(errors.weeklyPlan && touched.weeklyPlan ? ' is-invalid' : '')}`}
            name="weeklyPlan"
            type="text"
            component="textarea"
          />
          <ErrorMessage component="div" className="invalid-feedback" name="weeklyPlan" />
        </div>
      </div>
      <button className="btn btn-success mt-3" type="submit" disabled={isSubmitting}>Submit</button>
    </Form>

  )
}
  


RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

const createReportFormSchema = yup.object().shape({
  pickedStage1: yup.string().required('A radio option is required'),
  pickedStage2: yup.string().when('pickedStage1', {
    is: 'preRevenue',
    then: yup.string().required('A radio option is required'),
    otherwise: yup.string()
  }),
  totalWaitingList: yup.number().when('pickedStage1', {
    is: 'preRevenue',
    then: yup.number().nullable(false).required('Required'),
    otherwise: yup.number()
  }),
  revenueType: yup.string().when('pickedStage1', {
    is: 'postRevenue',
    then: yup.string().required('An option is required'),
    otherwise: yup.string()
  }),
  MRR: yup.number().when('pickedStage1', {
    is: 'postRevenue',
    then: yup.number().when('revenueType', {
      is: 'MRR',
      then: yup.number().nullable(false).required('Required'),
      otherwise: yup.number().when('revenueType', {
        is: 'one time purchase',
        then: yup.number(),
        otherwise: yup.number().when('revenueType', {
          is: 'mixed',
          then: yup.number(),
          otherwise: yup.number().nullable(false).required('Please choose the revenue type.')
        })
      })
    })
  }),
  Revenue: yup.number().when('pickedStage1', {
    is: 'postRevenue',
    then: yup.number().when('revenueType', {
      is: 'one time purchase',
      then: yup.number().nullable(false).required('Required'),
      otherwise: yup.number().when('revenueType', {
        is: 'mixed',
        then: yup.number().nullable(false).required('Required'),
        otherwise: yup.number().when('revenueType', {
          is: 'MRR',
          then: yup.number(),
          otherwise: yup.number().nullable(false).required('Please choose the revenue type.')
        })
      })
    })
  }),
  weeklyAchievement: yup.string().min(1).required('Required'),
  weeklyPlan: yup.string().min(1).required('Required')
})

const createReportForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      pickedStage1: '',
      pickedStage2: '',
      totalWaitingList: '',
      revenueType: '',
      MRR: '',
      Revenue: '',
      weeklyAchievement: '',
      weeklyPlan: ''
    }}
    validationSchema={createReportFormSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)

createReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default createReportForm
