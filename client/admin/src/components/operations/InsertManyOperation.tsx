import { useState } from "react";
import * as XLSX from "xlsx";
import { Category, GameTypes, Games, Group, InsertMany, WinningOrMachineEvent } from "../../utils/types";
import useValidator from "../../hooks/useValidator";
import BeforeUpdateBoard from "../utils/game-details-board/BeforeUpdateBoard";
import styles from "./Operations.module.css";
import { motion, AnimationProps, AnimatePresence } from "framer-motion";
import Button from "../utils/Button";
import { initialState, OperationsReturnValues } from "./reducers/operations.reducer";
import axios from "axios";
import ErrorNotification from "../error/ErrorNotification";

const converToNumber = (str: string) => {
  return parseInt(str, 10);
};

const convertArrElementsToNums = (arr: string[]) => {
  const arrNums: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    arrNums.push(parseInt(element, 10));
  }
  return arrNums;
};

interface Props {
  setOperationReturnData: React.Dispatch<React.SetStateAction<{ data: OperationsReturnValues }>>;
  game: Games;
  group: Group;
}

const Variant: AnimationProps["variants"] = {
  hidden: { opacity: 0, y: 20 },
  onView: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
  exit: { opacity: 0, y: 20 },
};

const findInvalidData = (arr: number[]) => {
  if (arr[0] === 1 && arr[1] === 1) {
    alert("Invalid detected");
    return true;
  }
};

function InsertManyOperation({ setOperationReturnData, game, group }: Props) {
  const [insertMany, setInsertMany] = useState(initialState);
  const [dataProcess, setDataProcess] = useState<Omit<InsertMany, "game">>({ years: [], payload: [] });
  const { dataEventValidator, validateInsertManyOperationPayload } = useValidator();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const games: GameTypes[] = [];
    let years: number[] = [];

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        const data = event.target?.result;
        // Excell reader
        const workbook = XLSX.read(data, { type: "binary" });
        // Names of all the sheets.-->string[]
        const sheetNames = workbook.SheetNames;
        years = convertArrElementsToNums(sheetNames);

        // Loop through all the sheets
        for (let i = 0; i < sheetNames.length; i++) {
          const sheetName = sheetNames[i];
          const sheet = workbook.Sheets[sheetName];
          // Clean the data
          const csv = XLSX.utils.sheet_to_csv(sheet); // Convert excel format data to CSV
          let arr = csv.split(/[\n]/);
          arr = arr.filter((x) => x.includes("*"));
          arr = arr.map((x) => x.replace("*", ""));

          for (let i = 0; i < arr.length; i++) {
            const event = arr[i];
            const cleanedData = event.split(",");
            const obj: GameTypes = {
              Index: games.length,
              Ev: converToNumber(cleanedData[0]),
              Date: cleanedData[1],
              Winning: convertArrElementsToNums(cleanedData.slice(2, 7)) as WinningOrMachineEvent,
              WT: converToNumber(cleanedData[7]),
              Machine: convertArrElementsToNums(cleanedData.slice(8, 13)) as WinningOrMachineEvent,
              MT: converToNumber(cleanedData[13]),
              Name: cleanedData[14].toLocaleUpperCase() as Games,
              Year: converToNumber(cleanedData[15]),
              Category: cleanedData[16] as Category,
            };

            const invalidInMachine = findInvalidData(obj.Machine);
            const invalidInWinning = findInvalidData(obj.Winning);
            if (invalidInMachine || invalidInWinning) {
              console.log(obj);
              return;
            }

            const isAllVild = dataEventValidator(obj);
            if (isAllVild?.err) {
              console.log(obj);
              alert(isAllVild.message);
              return;
            }
            games.push(obj);
          }
        }

        setDataProcess(() => ({ years, payload: games }));
      });
      reader.readAsBinaryString(file);
    }
  };

  const handleInsertManyOperation = () => {
    setInsertMany((prev) => ({ ...prev, loading: true, error: initialState.error }));

    const { years, payload } = dataProcess;
    const allInputsIsPresent = game && years.length > 1 && payload.length > 100;
    if (!allInputsIsPresent) {
      setInsertMany((prev) => ({ ...prev, loading: false, error: { err: true, message: "values/value is invalid" } }));
      return;
    }
    const gameAndPayloadGameNameIsEqual = game === payload[0].Name;
    if (!gameAndPayloadGameNameIsEqual) {
      setInsertMany((prev) => ({ ...prev, loading: false, error: { err: true, message: "game names are not equal" } }));

      return;
    }
    const data: InsertMany = {
      game,
      years,
      payload,
    };

    const isValidData = validateInsertManyOperationPayload(data, group as Group);
    if (isValidData?.err) {
      setInsertMany((prev) => ({ ...prev, loading: false, error: { err: true, message: isValidData.message as string } }));

      return;
    }

    const fetch = () => {
      axios
        .post("http://localhost:8000/api/games/data/insert_many", { payload: data })
        .then((res) => {
          console.log(res.data);
          if (res.data?.response?.Year) {
            setInsertMany((prev) => ({ ...prev, data: res.data }));

            setOperationReturnData(() => ({ data: res.data }));
          }
        })
        .catch((err) => {
          const ERROR = err.message || err.response?.data?.message || "Server error";
          console.log(err);
          setInsertMany((prev) => ({ ...prev, error: { err: true, message: ERROR } }));
        })
        .finally(() => {
          setInsertMany((prev) => ({ ...prev, loading: false }));
        });
    };
    fetch();
  };

  const nameOfCurrentGameUpload = dataProcess?.payload[0]?.Name ?? "";
  const len = nameOfCurrentGameUpload ? dataProcess.payload.length : 0;
  return (
    <>
      <ErrorNotification error={insertMany.error} />
      <AnimatePresence key={"file-upload"}>
        <motion.div variants={Variant} initial="hidden" whileInView={"onView"} exit={"exit"} className={styles.insertMany}>
          <BeforeUpdateBoard name="Game" value={nameOfCurrentGameUpload} />
          <form className={styles.fileUpload}>
            <input id={styles.file} type="file" aria-required accept="xlsx" required onChange={handleFileUpload} />
            <Button handleSubmit={handleInsertManyOperation} loading={insertMany.loading} />
          </form>
          <BeforeUpdateBoard name="Entries" value={len} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default InsertManyOperation;
