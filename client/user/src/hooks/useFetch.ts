import axios from "axios"
import config from "../app_config"

const URL = config.get("BASE_URL")

interface Status {
  error: { err: boolean; message: string }
  loading: boolean
  data: any
}

interface Props {
  operation: "post" | "get" | "patch"
  setStatus: React.Dispatch<React.SetStateAction<Status>>
  initialData: any
  path: string
  payload?: any
}

function useFetch({ operation, setStatus, initialData, path, payload }: Props) {
  const fetch = () => {
    setStatus((prev) => ({ ...prev, loading: true, error: { err: false, message: "" } }))

    const sendQueries = () => {
      axios[operation](`${URL}/${path}`, { payload })
        .then((res) => {
          const data = res?.data ?? initialData
          setStatus((prev) => ({ ...prev, data }))
        })
        .catch((err) => {
          const ERROR = err.response?.data?.message || err?.message
          setStatus((prev) => ({ ...prev, error: { err: true, message: ERROR } }))
        })
        .finally(() => setStatus((prev) => ({ ...prev, loading: false })))
    }
    sendQueries()
  }
  return [fetch]
}

export default useFetch
