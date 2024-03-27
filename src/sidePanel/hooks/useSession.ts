import { useContext } from 'react'
import { type RTCSession } from "jssip/lib/RTCSession";
import { context } from '../providers/SessionProvider'

export const useSession = () => {
  const { session, setSession } = useContext(context)

  return [session, setSession] as [RTCSession, (session: RTCSession | ((s: RTCSession) => RTCSession)) => void]
}
