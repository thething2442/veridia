import * as React from "react"
import axios from "axios"

export function useFetch(url) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const post = React.useCallback(async (body) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await axios.post(url, body)
      setData(res.data)
      return res.data
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [url])

  return { error,data,isLoading,post }
}