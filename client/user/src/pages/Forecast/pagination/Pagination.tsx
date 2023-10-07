import React, { Fragment, useState } from "react"
import styles from "../pagination/Pagination.module.css"
const limit = 5
interface Props {
  setPage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  page: number
  pages: number[]
}

function Pagination({ setPage, page, pages }: Props) {
  const [startIndex, setStartIndex] = useState(1)
  const [endIndex, setEndIndex] = useState(limit)
  const disabledNextBtn = endIndex >= pages.length || limit >= pages.length
  const disabledPrevBtn = startIndex <= 1 || limit >= pages.length

  const handlePrev = () => {
    console.log(startIndex)
    setEndIndex((prev) => prev - limit)
    setStartIndex((prev) => prev - limit)
  }

  const handleNext = () => {
    console.log(endIndex)
    setEndIndex((prev) => prev + limit)
    setStartIndex((prev) => prev + limit)
  }
  return (
    <div className={styles.pagenation}>
      <button disabled={disabledPrevBtn} className={disabledPrevBtn ? styles.disabled : styles.active} onClick={handlePrev}>
        Prev
      </button>
      {pages.map((v, index) => {
        return (
          <Fragment key={index}>
            {v < startIndex && <span style={{ color: "white" }}>.</span>}
            {v <= endIndex && v >= startIndex && (
              <button className={page === v ? `${styles.activePage}` : ""} key={index} onClick={(e) => setPage(e)}>
                {v}
              </button>
            )}
            {v > endIndex && <span style={{ color: "white" }}>.</span>}
          </Fragment>
        )
      })}
      <button disabled={disabledNextBtn} className={disabledNextBtn ? styles.disabled : styles.active} onClick={handleNext}>
        Next
      </button>
    </div>
  )
}

export default Pagination
