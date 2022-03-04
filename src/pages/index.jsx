import { useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Table from 'react-bootstrap/Table'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import Button from '@mui/material/Button'
import { Col, Row, Form } from 'react-bootstrap'
import CompsLayout from '@/components/layouts/Layout'

const row = ['DOMAIN', 'FOUNDED', 'COUNTRY', 'CATEGORY', 'SCORE']
const domain = ['https://itch.io', 'https://google.com', 'https://figma.com', 'https://facebook.com', 'https://youtube.com']
const founded = ['1999', '2000', '2022', '2002', '2005']
const country = ['US', 'UK', 'Mexico', 'Ukraine', 'Russia']
const category = ['education', 'household', 'internet', 'crypto', 'energy']
const score = [12, 56, 78, 97, 76]

export default function Home() {
  const [domainName, setDomainName] = useState(null)
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const [someList, setSomeList] = useState(null)

  const handleDomainSearchSubmit = (e, domainName) => {

  }

  const handleExpanding = (event) =>{
    setShow(!show)
    setTarget(event.target)
  } 

  const handleRadioValue = (event) => {
    setSomeList(event.target.value)
  }

  return (
    <CompsLayout>
      <div className="container mt-5">
        <div id="table-container" className="row">
          <div id="table-heading" className="mb-5">
            <h3 className="text-center">Leader Board</h3>
          </div>


          <div className="d-flex justify-content-around">
            {/* the search bar is using tailwind css at the moment */}
            <form id="channel-form" onSubmit={(e) => handleDomainSearchSubmit(e, domainName)}>
              <div className="input-field col s6 flex justify-center">
                <input
                  type="text"
                  placeholder="Enter Channel Name"
                  id="channel-input"
                  className="outline-none focus:border-b-2 m-8 h-28 w-1/2 text-3xl"
                  value={domainName || ''}
                  onChange={(e) => {
                    e.preventDefault()
                    setDomainName(e.target.value)
                  }}
                />

                <button
                  type="button"
                  className="outline border rounded p-4 hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault()
                    handleDomainSearchSubmit(e, domainName)
                  }}
                >
                  Search
                </button>
              </div>
            </form>
            {/* need to fix the filter btn after the completion of weekly update form */}
            <div ref={ref} className="notification-section">
              {/* button for multi-select & move tasks to another list */}
              <Button
                type="button"
                className="btn btn-primary ms-5 h-100"
                onClick={() => {
                  handleExpanding()
                }}
              >Filter
              </Button>
              {/* overlay for showing choices of other lists */}
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                className="notification-container"
              >
                <Popover id="popover-contained" className="pop-over-position position-absolute">
                  <Popover.Header as="h3">
                    Select one list
                  </Popover.Header>
                  <Popover.Body>
                    <Form>
                      <fieldset>
                        <Form.Group as={Row} className="mb-1">
                          <Col sm={10}>
                            <div>asdfasdf</div>
                            {
                              {/* todos.map((someTodoList) => (
                                <div key={someTodoList.id} className="m-1">
                                  <Form.Check
                                    label={someTodoList.name}
                                    type="radio"
                                    id={someTodoList.id}
                                    name="radio"
                                    value={`${someTodoList.id}`}
                                    onChange={handleRadioValue}
                                  />
                                </div>
                              )) */}
                            }
                          </Col>
                        </Form.Group>
                      </fieldset>
                    </Form>
                    <div>
                      <Button
                        variant="contained"
                        size="medium"
                        className="mt-4"
                        onClick={() => {
                          handleConfirmMovingToAnotherList()
                          setShow(selectedFromHook)
                        }}
                      >Confirm
                      </Button>
                    </div>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </div>
          </div>

          <div className="col col-lg-12 col-md-12 col-sm-12 col-md-auto">
            <Table responsive>
              <thead>
                <tr>
                  <th />
                  {
                      row.map((item) => (
                        <th key={item}>
                          {item}
                        </th>
                      ))
                    }
                </tr>
              </thead>
              <tbody>
                {
                  domain && domain.map((item, i) => (
                    <tr key={i} className="border-bottom">
                      <td className="id-style d-flex align-items-center justify-content-center mt-2">{i + 1}</td>
                      <td>{item}</td>
                      <td>{founded[i]}</td>
                      <td>{country[i]}</td>
                      <td>{category[i]}</td>
                      <td>{score[i]}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className="text-center my-5 container">
        <button className="btn btn-info mx-3 leaderboard-btn-width">1</button>
        <button className="btn btn-info mx-3 leaderboard-btn-width">previous</button>
        <button className="btn btn-info mx-3 leaderboard-btn-width">next</button>
        <button className="btn btn-info mx-3 leaderboard-btn-width">10</button>
      </div>
    </CompsLayout>
  )
}
