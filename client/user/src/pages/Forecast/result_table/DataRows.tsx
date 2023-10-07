import React, { Fragment, useEffect } from "react"
import TargetRow from "./TargetRow"
import NormalRow from "./NormalRow"
import { GameTypes } from "../../../utils/type"

interface Props {
  games: GameTypes[]
}

function DataRows({ games }: Props) {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        // Load more data when close to the bottom
        console.log(scrollHeight - 100)
      }
      // const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      // const scrollHeight = document.documentElement.scrollHeight
      // const clientHeight = document.documentElement.clientHeight
      // const height = scrollHeight - clientHeight
      // const scrolled = (winScroll / height) * 100
    }
    document.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <>
      <Fragment>
        {games.map((data, index) => {
          return <Fragment key={index}>{data.target ? <TargetRow event={data} key={data._id} /> : <NormalRow event={data} key={data.Index} />}</Fragment>
        })}
      </Fragment>
    </>
  )
}

export default DataRows
