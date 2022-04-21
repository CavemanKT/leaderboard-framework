import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import useCurrencyConverter from '@/_hooks/currencyConverterAPI'

const fcObj = {
  AED: 3.963415,
  AFN: 95.044752,
  ALL: 121.181312,
  AMD: 517.610478,
  ANG: 1.967632,
  AOA: 452.198386,
  ARS: 122.674004,
  AUD: 1.464262,
  AWG: 1.942271,
  AZN: 1.843545,
  BAM: 1.95797,
  BBD: 2.204389,
  BDT: 94.267823,
  BGN: 1.953665,
  BHD: 0.406783,
  BIF: 2240.748849,
  BMD: 1.079039,
  BND: 1.478316,
  BOB: 7.51675,
  BRL: 5.021415,
  BSD: 1.091783,
  BTC: 0.000026496215,
  BTN: 83.101589,
  BWP: 12.599553,
  BYN: 3.617587,
  BYR: 21149.16931,
  BZD: 2.200685,
  CAD: 1.359212,
  CDF: 2173.184593,
  CHF: 1.022411,
  CLF: 0.031933,
  CLP: 881.132488,
  CNY: 6.886319,
  COP: 4026.974483,
  CRC: 711.701202,
  CUC: 1.079039,
  CUP: 28.59454,
  CVE: 110.386661,
  CZK: 24.416825,
  DJF: 194.36061,
  DKK: 7.439166,
  DOP: 60.057078,
  DZD: 155.291006,
  EGP: 19.903957,
  ERN: 16.185591,
  ETB: 56.190288,
  EUR: 1,
  FJD: 2.285193,
  FKP: 0.829395,
  GBP: 0.828977,
  GEL: 3.296472,
  GGP: 0.829395,
  GHS: 8.297445,
  GIP: 0.829395,
  GMD: 58.214149,
  GNF: 9726.019419,
  GTQ: 8.362917,
  GYD: 228.411741,
  HKD: 8.46277,
  HNL: 26.795035,
  HRK: 7.559098,
  HTG: 118.455457,
  HUF: 373.866235,
  IDR: 15490.849336,
  ILS: 3.503015,
  IMP: 0.829395,
  INR: 82.564854,
  IQD: 1593.421404,
  IRR: 45643.360144,
  ISK: 140.005692,
  JEP: 0.829395,
  JMD: 168.943067,
  JOD: 0.765011,
  JPY: 138.486593,
  KES: 124.682994,
  KGS: 86.806013,
  KHR: 4416.126255,
  KMF: 492.394083,
  KPW: 971.135454,
  KRW: 1338.003267,
  KWD: 0.329776,
  KYD: 0.909803,
  KZT: 494.745278,
  LAK: 12978.163181,
  LBP: 1650.9737,
  LKR: 351.859676,
  LRD: 164.227675,
  LSL: 15.883729,
  LTL: 3.186122,
  LVL: 0.6527,
  LYD: 5.134864,
  MAD: 10.667257,
  MDL: 20.153639,
  MGA: 4415.034146,
  MKD: 61.715334,
  MMK: 2021.371465,
  MNT: 3231.574941,
  MOP: 8.817536,
  MRO: 385.216827,
  MUR: 46.446624,
  MVR: 16.67175,
  MWK: 886.499614,
  MXN: 21.438327,
  MYR: 4.590777,
  MZN: 68.874765,
  NAD: 15.883631,
  NGN: 447.262061,
  NIO: 39.091084,
  NOK: 9.554463,
  NPR: 132.960076,
  NZD: 1.600987,
  OMR: 0.414871,
  PAB: 1.091703,
  PEN: 4.076655,
  PGK: 3.84694,
  PHP: 56.606939,
  PKR: 197.879323,
  PLN: 4.643818,
  PYG: 7489.215338,
  QAR: 3.928751,
  RON: 4.940816,
  RSD: 117.696192,
  RUB: 85.70162,
  RWF: 1111.103996,
  SAR: 4.046197,
  SBD: 8.625502,
  SCR: 15.553404,
  SDG: 481.790432,
  SEK: 10.340984,
  SGD: 1.474545,
  SHP: 1.486265,
  SLL: 13342.320623,
  SOS: 625.300606,
  SRD: 22.345285,
  STD: 22333.933914,
  SVC: 9.55244,
  SYP: 2711.031616,
  SZL: 15.991428,
  THB: 36.424072,
  TJS: 13.592481,
  TMT: 3.787428,
  TND: 3.245212,
  TOP: 2.455515,
  TRY: 15.822007,
  TTD: 7.414872,
  TWD: 31.561035,
  TZS: 2505.52897,
  UAH: 32.097381,
  UGX: 3843.035557,
  USD: 1.079039,
  UYU: 45.111719,
  UZS: 12358.70647,
  VEF: 230731202845.517,
  VND: 24772.043593,
  VUV: 121.48002,
  WST: 2.789793,
  XAF: 656.668568,
  XAG: 0.041771,
  XAU: 0.000546,
  XCD: 2.916158,
  XDR: 0.798665,
  XOF: 656.668568,
  XPF: 119.87469,
  YER: 270.02987,
  ZAR: 15.971669,
  ZMK: 9712.650525,
  ZMW: 18.996385,
  ZWL: 347.450198
}


const RenderForm = ({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => {
  const [pickedStage1Val, setPickedStage1Val] = useState(null)
  const [MRR, setMRR] = useState('')
  const [revenue, setRevenue] = useState('')
  const [ fc, setFc ] = useState('')
  const { apiCurrencyConverter } = useCurrencyConverter()
  const [tcResult, setTcResult] = useState(null)

  useEffect(() => {
    console.log(fc)
  }, [fc])
  
  const handlePickedStage1Ref = (value) => {
    setPickedStage1Val(value)
  }

  const handleRefMRR = (e) => {
    setMRR(e.target.value)
    apiCurrencyConverter().then((resp) => {
      let rate = resp.rates[fc]
      let usdRate = resp.rates['USD']  // base currency is EUR
      let result = e.target.value / rate * usdRate
      setTcResult(result)
    })
  }

  const handleRefRevenue = (e) => {
    setRevenue(e.target.value)
    apiCurrencyConverter().then((resp) => {
      let rate = resp.rates[fc]
      let usdRate = resp.rates['USD']  // base currency is EUR
      let result = e.target.value / rate * usdRate
      setTcResult(result)
    })
  }
  
  const handleFcChange = (e) => {
    setFc(e.target.value)
    console.log(MRR, revenue)
    // calculate the price
    apiCurrencyConverter()
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
                <>
                  <div>
                    <label htmlFor="FC" style={{ display: 'block' }}>
                      From Currency:
                    </label>
                    <select
                      name="FC"
                      value={values.FC}
                      onChange={handleFcChange}
                      onBlur={handleBlur}
                      style={{ display: 'block' }}
                    >
                      <option value='EUR' label='EUR' />
                      <option value='GBP' label='GBP' />
                    </select>
                  </div>
                  <div className="form-group mt-5">
                    <label htmlFor="MRR">MRR:</label>
                    <Field
                      name="MRR"
                      placeholder="$"
                      id="MRR"
                      className={`w-50 form-control ${(errors.MRR && touched.MRR ? ' is-invalid' : '')}`}
                      type="number"
                      onChange={(e) => handleRefMRR(e)}
                      value={MRR}
                    />
                    <ErrorMessage component="div" className="invalid-feedback" name="MRR" />
                  </div>
                  <div>
                    ${tcResult}
                  </div>
                </>
              )
            }
            {
              (values.revenueType == 'one time purchase' || values.revenueType == 'mixed') && (
                <>
                  <div>
                    <label htmlFor="FC" style={{ display: 'block' }}>
                      From Currency:
                    </label>
                    <select
                      name="FC"
                      value={values.FC}
                      onChange={handleFcChange}
                      onBlur={handleBlur}
                      style={{ display: 'block' }}
                    >
                      <option value='EUR' label='EUR' />
                      <option value='GBP' label='GBP' />
                    </select>
                  </div>
                  <div className="form-group mt-5">
                    <label htmlFor="Revenue">Revenue:</label>
                    <Field
                      name="Revenue"
                      placeholder="$"
                      id="Revenue"
                      className={`w-50 form-control ${(errors.Revenue && touched.Revenue ? ' is-invalid' : '')}`}
                      type="number"
                      onChange={e => handleRefRevenue(e)}
                      value={revenue}
                    />
                    <ErrorMessage component="div" className="invalid-feedback" name="Revenue" />
                  </div>
                    <div>
                      ${tcResult}
                    </div>
                </>
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
