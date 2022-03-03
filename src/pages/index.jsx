import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import CompsLayout from '@/components/layouts/Layout'
import Table from 'react-bootstrap/Table'

const row = ['DOMAIN', 'FOUNDED', 'COUNTRY', 'CATEGORY', 'SCORE']
const domain = ['https://itch.io', 'https://google.com', 'https://figma.com', 'https://facebook.com', 'https://youtube.com']
const founded = ['1999', '2000', '2022', '2002', '2005']
const country = ['US', 'UK', 'Mexico', 'Ukraine', 'Russia']
const category = ['education', 'household', 'internet', 'crypto', 'energy']
const score = [12, 56, 78, 97, 76]

export default function Home() {


  return (
    <CompsLayout>
      <div className="container mt-5">
        <div id="table-container" className="row">
          <div id="table-heading" className="mb-5">
            <h3 className="text-center">Leader Board</h3>
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
    </CompsLayout>
  )
}
