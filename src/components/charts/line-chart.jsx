/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'

import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const LineChart = ({ chartData }) => {
    if(chartData?.score?.length == 0) return null

  const [collections, setCollections] = useState({
    series: [{
      name: 'score chart',
      data: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: `need a name for the chart`,
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Season1', 'Season2', 'Season3', 'Season4', 'd', 'e','f', 'g']  // collections of ----- report's createdAt -- new Date().getDay() ---> can get weekday, use weekday instead of season
      }
    }
  })

  // figured out how to do it.

  useEffect(() => {

    const newData = chartData?.scores   // get the collections of data
    setCollections(
      {
        series: [{
          name: 'score',
          data: newData
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: `scores grouped by ${chartData?.scores?.length} consecutive weeks`,
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: chartData?.categories // x-axis
          }
        }
      }
    )
  }, [chartData?.scores[0]])

  return (
    <div id="apex-chart" className='container'>
      {
        chartData?.scores?.length >= 1 && (
          <Chart
            options={collections?.options}
            series={collections?.series}
            type="line"
            height={350}
          />
        )
      }
    </div>
  )
}

export default LineChart
