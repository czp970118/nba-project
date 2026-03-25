import { useEffect, useState } from "react";
import BaseStoreContext from "./context/base-store-context";
import { getCookie } from "@/utils";
import { Spin } from "antd";
import CommonBaseStore from "@/class/common-base-store";
import { Route, Routes } from "react-router-dom";
import UserRedirect from "./components/use-redirect";
import BaseLayout from "./components/layout";
import TeamCenter from "./pages/team/team-enter";
import PlayerCards from "./pages/player/player-cards";
import UserInfo from "./pages/user-info";
import PlayerCenter from "./pages/player/player-center";
import TeamCreate from "./pages/team/team-create";
import ContextStudy from "./pages/study/context-study";
import TeamDetail from "./pages/team/team-detail";
import PlayerDetail from "./pages/player/player-detail";
import "./App.css";

function App() {
   const [baseStore, setBaseStore] = useState<CommonBaseStore | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const userStorage = getCookie("userStatus");
      const userStatus = userStorage ? JSON.parse(userStorage) : {};
      const { userId } = userStatus;
      const loadBaseStore = async () => {
         setLoading(true);
         const store = new CommonBaseStore(userId);
         await store.loadUserInfo();
         setBaseStore(store);
         setLoading(false);
      };
      loadBaseStore();
   }, []);

   if (loading) {
      return <Spin spinning={loading} />;
   }

   console.log("baseStore", baseStore);
   return (
      <UserRedirect>
         <BaseStoreContext.Provider value={baseStore as CommonBaseStore}>
            <div className="contenter">
               <BaseLayout>
                  <Routes>
                     <Route path="team/center" element={<TeamCenter />} />
                     <Route path="team/detail/:id" element={<TeamDetail />} />
                     <Route path="team/create" element={<TeamCreate />} />
                     <Route path="player/cards" element={<PlayerCards />} />
                     <Route path="user/info" element={<UserInfo />} />
                     <Route path="player/center" element={<PlayerCenter />} />
                     <Route path="player/detail/:id" element={<PlayerDetail />} />
                     <Route path="study/context" element={<ContextStudy />} />
                  </Routes>
               </BaseLayout>
            </div>
         </BaseStoreContext.Provider>
      </UserRedirect>
   );
}

export default App;
