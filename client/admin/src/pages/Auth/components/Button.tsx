import React from "react"
import styles from "../Auth.module.css"
import LoadingIndicator from "../../../components/utils/LodingIndicator"

interface Props extends React.ComponentPropsWithRef<"button"> {
  loading: boolean
}

function Button(props: Props) {
  const { loading, ...rest } = props
  return (
    <div id={styles.submit}>
      <button {...rest}>
        {loading && <LoadingIndicator />}
        <span>Submit</span>
      </button>
    </div>
  )
}

export default Button
