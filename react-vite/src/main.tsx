import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import App from "./App.tsx";
import Login from "./pages/login";
import Regist from "./pages/regist";
import zhCN from "antd/lib/locale/zh_CN";
import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <Router>
      <ConfigProvider locale={zhCN}>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/pages/*" element={<App />} />
         </Routes>
      </ConfigProvider>
   </Router>
);
