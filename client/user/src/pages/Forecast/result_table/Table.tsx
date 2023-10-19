import React, { useState, useEffect, useRef, Fragment } from "react"
import styles from "./Table.module.css"
import DataRows from "./DataRows"
import EndOfGame from "./EndOfGame"
import Pagination from "../pagination/Pagination"
import { ResultType, WhereToSearch } from "../../../utils/type"

interface Props {
  result: ResultType[]
  whereToExtractData?: WhereToSearch
}

const getPageNums = (pageLenght: number) => {
  const pages = []
  for (let i = 1; i <= pageLenght; i++) {
    pages.push(i)
  }
  return pages
}

function Table({ result, whereToExtractData }: Props) {
  const [page, setPage] = useState(1)
  const tableRef = useRef<HTMLDivElement>(null)

  const dataLenght = result.length
  const pageLimit = 1
  const currPage = page * pageLimit

  let prev = page - 1
  const prevPage = prev * pageLimit
  const dataToRender = result.slice(prevPage, currPage)
  const pageLenght = Math.round(dataLenght / pageLimit)
  const pages = getPageNums(pageLenght)

  const handlePagination = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement
    const value = parseInt(button.textContent!)
    setPage(value)
  }

  useEffect(() => {
    const table = tableRef.current
    table?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div ref={tableRef} className={styles.tableWrapper}>
      {result[0]?.game.length > 0 && (
        <>
          <table id={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ev</th>
                <th>DATE</th>
                <th>W1</th>
                <th>W2</th>
                <th>W3</th>
                <th>W4</th>
                <th>W5</th>
                <th>TOTAL</th>
                <th style={{ backgroundColor: "black" }}></th>
                <th>M1</th>
                <th>M2</th>
                <th>M3</th>
                <th>M4</th>
                <th>M5</th>
                <th>TOTAL</th>
                <th>Game</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody id={styles.tableBody}>
              {dataToRender.map(({ game, end }, index) => {
                return (
                  <Fragment key={index}>
                    <DataRows whereToExtractData={whereToExtractData} games={game} key={index} />
                    <EndOfGame />
                  </Fragment>
                )
              })}
            </tbody>
          </table>
          <Pagination page={page} pages={pages} setPage={handlePagination} />
        </>
      )}
    </div>
  )
}

export default React.memo(Table)
