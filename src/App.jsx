import GreenButton from './Components/Button.jsx'
import AppCard from './Components/AppCard.jsx'
import { useEffect, useState } from "react"
import './App.css'

// const AppsArr = [
//   {
//     Key: "Spotify",
//     Title: "Spotify",
//     Icon: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
//     Selected: false
//   },
//   {
//     Key: "Teams",
//     Title: "Teams",
//     Icon: "https://cdn-icons-png.flaticon.com/512/906/906349.png",
//     Selected: false
//   },
//   {
//     Key: "Outlook",
//     Title: "Outlook",
//     Icon: "https://cdn-icons-png.flaticon.com/512/732/732223.png",
//     Selected: false
//   }
// ]

function App() {
  const [selectedAppsArr, setSelectedApp] = useState([]);

  useEffect(() => {
    async function loadApps() {
      const data = await window.electronAPI.getApps();
      setSelectedApp(data);
    }

    loadApps();
  }, []);

  function toggleApp(index) {
    const updated = [...selectedAppsArr];
    updated[index].Selected = !updated[index].Selected;
    setSelectedApp(updated);
  }

  async function launchSelected() {
    const selected = selectedAppsArr.filter(a => a.Selected);

    for (const app of selected) {
      await window.electronAPI.launchApp(app.path);
    }
  }

  const selectedAppsCount = selectedAppsArr.filter(app => app.Selected).length

  

  return (
    <div className="flex flex-col w-full min-h-screen p-10">
      <div className="border-2 border-[#ff9018] w-fit rounded-xl p-4">
        <span className="justify-center font-eva text-4xl font-black uppercase leading-none text-[#ff9018] tracking-tight scale-x-75 scale-y-200 origin-left">
          Workspace Launcher
        </span>
      </div>

      <div className="flex flex-col items-center self-center mt-[15vh] p-5 text-center w-max shadow-[0_0_5px_rgba(92,247,174,0.6)] border-2 border-[#ff9018] scale-120">
        <p className="  font-mono font-medium text-2xl tracking-tight text-[#ff9018] uppercase origin-center">
          Click the apps you want to launch
        </p>
        <div className="mt-5 grid grid-cols-3  justify-around gap-x-10 gap-y-10" >
          {
            selectedAppsArr.map((item, index) => {
              return <AppCard key={item.Key} AppTitle={item.title} Selected={item.Selected} OnClick={() => toggleApp(index)}>
              </AppCard>
            })
          }

        </div>
        <div className="mx-auto mt-5 p-0.5 w-max border-2 border-[#ff9018] item-end bg-black">
          <GreenButton text={` ${selectedAppsCount > 0 ? `Launch ${selectedAppsCount} Apps` : "No app selected"} `} count={selectedAppsCount} />
        </div>
      </div>
    </div>

  )
}

export default App;