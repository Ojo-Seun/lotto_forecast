import React from "react"
import { WinningOrMachineEvent } from "../utils/type"

interface Inputs {
  box0: number
  box1: number
  box2: number
  box3: number
  box4: number
}

function useDataConvertion() {
  const objToArr = (obj: Inputs) => {
    const { box0, box1, box2, box3, box4 } = obj
    return [box0, box1, box2, box3, box4] as WinningOrMachineEvent
  }

  const arrToObj = (inputs: number[]) => {
    return {
      box0: inputs[0],
      box1: inputs[1],
      box2: inputs[2],
      box3: inputs[3],
      box4: inputs[4],
    }
  }

  return { arrToObj, objToArr }
}

export default useDataConvertion
