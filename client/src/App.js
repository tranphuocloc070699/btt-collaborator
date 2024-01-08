import React from "react";
import store from "./store/store";
import "./App.css"

import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CheckMicroFrontEnd } from "./utils/Token";

import Sidebar from "./components/Sidebar";

import Collaborator from "./pages/collaborator";


// Config antd DatePiker Phiên Bản Tiếng Việt
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import updateLocate from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/vi_VN";
import "dayjs/locale/vi";
dayjs.extend(updateLocate)
dayjs.updateLocale("vi",{weekStart: 0})


function App() {
  const pathMicro = CheckMicroFrontEnd()

  const commonRoutes  = (
    <>
        <Route path={`${pathMicro}/manager`}  component={Collaborator} />
   
    </>
  )

  const HandelRouter = () => {
      if(!window.location.href.includes("erp")){
        return (
          <Switch>{commonRoutes}</Switch>
        )
      }else{
        return (
          <Switch>{commonRoutes}</Switch>
        )
      }
  };

  if (window.location.href.includes("erp")) {
    return (
      <ConfigProvider locale={locale}>
        <Provider store={store}>
          <ToastContainer basename="/" />
          <BrowserRouter>
            <div id={"collaborator-service"}>
              {HandelRouter()}
            </div>
          </BrowserRouter>
        </Provider>
      </ConfigProvider>
    );
  } else {
    return (
      <ConfigProvider locale={locale} theme={{
        components: {
          Tabs: {
            itemSelectedColor:'#29B171',
            itemHoverColor:'#29B171',
            inkBarColor:'#29B171'
          },
        },
      }}>
        <Provider store={store}>
            <ToastContainer />
            <BrowserRouter basename="/">
              <div className={"party-service"}>
                <Sidebar />
                <div className={"party_service_content"}>
                  {HandelRouter()}
                </div>
              </div>
            </BrowserRouter>
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
