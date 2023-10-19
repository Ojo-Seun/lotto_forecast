import axios from "axios"
import config from "../app_config"
import { useAppSelector } from "../app/hooks"

const URL = config.get("BASE_URL")

interface Status<T> {
  error: { err: boolean; message: string }
  loading: boolean
  data: T
}

interface Props<T> {
  operation: "post" | "get" | "patch" | "delete"
  path: string
  payload?: any
  setStatus: React.Dispatch<React.SetStateAction<Status<T>>>
  initailValue: T
}

interface Option<T> {
  cb: (data: T) => void
}

function useFetch<T>({ operation, path, payload, initailValue, setStatus }: Props<T>) {
  const user = useAppSelector((state) => state.user)
  const fetch = (op?: Option<T>) => {
    setStatus((prev) => ({ ...prev, loading: true, data: initailValue, error: { err: true, message: "" } }))
    const sendQueries = () => {
      axios[operation](`${URL}/${path}`, { payload }, { headers: { Authorization: `Bearer ${user.access_token}` } })
        .then((res) => {
          const data = res.data ? res.data : initailValue
          setStatus((prev) => ({ ...prev, data }))
          if (op?.cb) {
            op.cb(data)
          }
        })
        .catch((err) => {
          const Err = err.response?.data?.message ?? err.message
          setStatus((prev) => ({ ...prev, error: { err: true, message: Err } }))
        })
        .finally(() => {
          setStatus((prev) => ({ ...prev, loading: false }))
        })
    }

    sendQueries()
  }
  return [fetch]
}

export default useFetch
