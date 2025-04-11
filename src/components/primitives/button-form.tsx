import { Action } from "@/lib/types"

import ButtonWhite from "./button-white"

function ButtonForm({ actionType, className }: { actionType: Action, className?: string }) {
  return (
    <ButtonWhite text={actionType === 'add' ? "Create" : "Save"} type="submit" className={className} />
  )
}

export default ButtonForm