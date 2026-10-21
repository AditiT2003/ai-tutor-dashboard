import DashboardHome from './components/dashboard/DashboardHome'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'

function App() {
  return (
    <div className="min-h-screen bg-[#101936] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 p-4">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopBar />
          <DashboardHome />
        </div>
      </div>
    </div>
  )
}

export default App
