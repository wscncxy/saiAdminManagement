import {useLocation, useNavigate, useRoutes,Navigate} from "react-router-dom";
import * as React from 'react';
import './index.css';
import App from './auth-manage/main';
import {ReactNode, useEffect} from "react";

interface Route {
    name?: string,
    path: string,
    type: string,
    element?: ReactNode,
    children?: Route[],
    auth?: boolean
}

const globalRoutes: Route[] = [
    {
        path: "/",
        type: "",
        element:  <App/>,
    },
    {
        path: "/role/list",
        type: "",
        element:  <App/>,
    },
    {
        path: "/user/list",
        type: "",
        element:  <App/>,
    },
    {
        path: "/auth/list",
        type: "",
        element:  <App/>,
    },

];

const isLogin = false;

export const OnRouteBefore = ({children}: any) => {
    console.log('start it')
    const location = useLocation();
    const navigator =useNavigate()
    return children
}

const transRouter = (globalRoutes: Route[]) => {
    console.log('start transRouter')
    globalRoutes.forEach(route => {
        if(route.type=="direct"){
            route.element=<OnRouteBefore><Navigate to={route.path} replace={true}/></OnRouteBefore>
        }else{
            route.element=<OnRouteBefore> {route.element}</OnRouteBefore>
        }
    })
    return globalRoutes
}

function GlobalRouter(){
    console.log('start GlobalRouter')
    return useRoutes(transRouter(globalRoutes))
}

export {
    GlobalRouter,
}