import { useState, memo } from "react"
import styles from "./SelectBox.module.css"
import { motion, AnimatePresence, AnimationProps } from "framer-motion"

interface Props {
  optionsList: any[]
  title?: string
  setSelectedOption: React.Dispatch<React.SetStateAction<any>>
  option: any
}

const ListVariants: AnimationProps["variants"] = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2, staggerChildren: 1 } },
  exist: { height: 0, transition: { duration: 0.2 } },
}

//const ItemVariamts = { hidden: { y: -10, }, visible: {  y: 0 } };

function SelectBox({ optionsList, title, setSelectedOption, option }: Props) {
  const [showList, setShowList] = useState(false)
  const [activeSelectionBox, setActiveSelectionBox] = useState(false)
  const defaultOption = "Select"
  const selectedOption = optionsList.includes(option) ? option : defaultOption

  // Shows and hide list
  const handleListVisibility = () => {
    setShowList((prev) => !prev)
  }

  // Handle Option selection, close list and deactivate selectionBox
  const handleSelection = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const li = e.target as HTMLLIElement
    const selectedOption = li.getAttribute("data-name") as string

    setSelectedOption(selectedOption) // Update parent state

    setShowList(false)
    setActiveSelectionBox(false)
  }
  const toggleSelectionBox = () => {
    setActiveSelectionBox((prev) => !prev)
  }

  const selectionBoxOperations = () => {
    handleListVisibility()
    toggleSelectionBox()
  }

  return (
    <div className={styles.container}>
      <>
        {title ? (
          <div className={styles.title}>
            <span style={{ fontWeight: "bold" }}>{title}</span>
          </div>
        ) : null}
      </>
      <div
        className={`${styles.selectionBox} ${
          activeSelectionBox ? styles.active : ""
        }`}
        onClick={selectionBoxOperations}
      >
        {selectedOption}
      </div>
      <AnimatePresence>
        {showList ? (
          <motion.ul
            key={"list"}
            variants={ListVariants}
            initial="hidden"
            animate="visible"
            exit={"exist"}
            className={styles.options}
          >
            {optionsList.map((option, index) => (
              <motion.li
                variants={{
                  hidden: { y: -50 },
                  visible: { y: 0, transition: { delay: index * 0.1 } },
                  exit: { y: 0 },
                }}
                data-name={option}
                className={styles.option}
                onClick={(e) => handleSelection(e)}
                key={index}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default memo(SelectBox)
