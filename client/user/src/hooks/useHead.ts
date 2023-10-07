import { useLayoutEffect } from "react"

interface Props {
  title: string
  descriptions: string
}

function useHead({ title, descriptions }: Props) {
  useLayoutEffect(() => {
    const titleTag = document.getElementsByTagName(
      "title",
    )[0] as HTMLTitleElement
    titleTag.textContent = title
    const meta = document.getElementById("descriptions") as HTMLMetaElement
    const desp = meta.getAttribute("descriptions")
    meta.setAttribute("descriptions", descriptions)
  }, [title, descriptions])
}

export default useHead
