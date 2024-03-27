import { useContext } from 'react'
import { type UA } from "jssip";
import { context } from '../providers/UAProvider'

export const useUA = () => {
  const { ua, setUa } = useContext(context)

  return [ua, setUa] as [UA, (ua: UA) => void]
}
