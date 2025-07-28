'use client'
import { useState, useEffect } from "react"
import axios from "axios"

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get('https://webanalyzer-veridia.onrender.com/web-analyzer/')
        setData(response.data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, []) // Empty dependency array means this effect runs once after the initial render

  if (loading) {
    return <div>Loading data...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Web Analyzer Data</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {/* Assuming each item has a 'url' and 'status' property, adjust as per your API response */}
              <p>URL: {item.url}</p>
              <p>Status: {item.status}</p>
              {/* Render other properties of your data item here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  )
}