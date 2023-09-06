/* eslint-disable react/prop-types */
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { BigSideBar, SmallSideBar, Loading } from '../components'
import Navbar from '../components/Navbar'
import { createContext, useContext, useState } from 'react'
import { checkDefaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { userQuery } from './queryFunctions'

const DashBoardContext = createContext()

const DashboardLayout = ({ queryClient }) => {
  const { user } = useQuery(userQuery).data

  const [showSideBar, setShowSideBar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const navigate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }
  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('auth/logout')
    queryClient.invalidateQueries()
    toast.success('User succesfully logged out')
  }
  return (
    <DashBoardContext.Provider
      value={{
        user,
        showSideBar,
        setIsDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
        isDarkTheme,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashBoardContext)
export default DashboardLayout
