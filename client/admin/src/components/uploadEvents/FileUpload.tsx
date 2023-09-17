import React from "react";

import * as XLSX from "xlsx";
import { Category, GameTypes, Games, WinningOrMachineEvent } from "../../utils/types";
import useValidator from "../../hooks/useValidator";

const converToNumber = (str: string) => {
  return parseInt(str, 10);
};

const convertArrElETonums = (arr: string[]) => {
  const arrNums: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    arrNums.push(parseInt(element, 10));
  }
  return arrNums;
};

function FileUpload() {
  const [dataValidator] = useValidator();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const games: GameTypes[] = [];
    let years: number[] = [];

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetNames = workbook.SheetNames; // Names of all the sheets
        years = convertArrElETonums(sheetNames);

        for (let i = 0; i < sheetNames.length; i++) {
          const sheetName = sheetNames[i];
          const sheet = workbook.Sheets[sheetName];

          const csv = XLSX.utils.sheet_to_csv(sheet);
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
              Winning: convertArrElETonums(cleanedData.slice(2, 7)) as WinningOrMachineEvent,
              WT: converToNumber(cleanedData[7]),
              Machine: convertArrElETonums(cleanedData.slice(8, 13)) as WinningOrMachineEvent,
              MT: converToNumber(cleanedData[13]),
              Name: cleanedData[14].toLocaleUpperCase() as Games,
              Year: converToNumber(cleanedData[15]),
              Category: cleanedData[16] as Category,
            };

            const isAllVild = dataValidator(obj);
            if (isAllVild?.err) {
              console.log(obj);
              alert(isAllVild.message);
              return;
            }
            games.push(obj);
          }
        }

        console.log(games);
        console.log(years);
      });
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" accept="xlsx" required onChange={handleFileUpload} />
    </div>
  );
}

export default FileUpload;
