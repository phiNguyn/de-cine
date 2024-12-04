import { useLocation } from 'react-router-dom'

export default function useCheckActiveNav() {
  const { pathname } = useLocation()

  const checkActiveNav = (nav: string) => {
    return pathname === nav; // So sánh toàn bộ đường dẫn
  }

  return { checkActiveNav }
}
