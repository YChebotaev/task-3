import { useContext } from 'react'
import { context, type History } from '../providers/HistoryProvider'

export const useHistory = () => {
  const { history, setHistory: baseSetHistory } = useContext(context)

  const setHistory = (h: History | ((h: History) => History)) => {
    const nextHistory = typeof h === 'function' ? h(history) : h

    chrome.storage.local
      .set({ history: nextHistory })
      .then(() => {
        baseSetHistory(nextHistory)
      })
  }

  return [history, setHistory] as [History, (history: History | ((history: History) => History)) => void]
}
