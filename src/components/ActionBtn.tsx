import clsx from 'clsx'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
interface ActionBtnProps {
  icon: IconType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        clsx(
          'flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 hover:text-primary hover:bg-[#4462bb3c]',
          disabled && 'opacity-50 cursor-not-allowed'
        )
      )}
    >
      <Icon size={18} />
    </button>
  )
}

export default ActionBtn
