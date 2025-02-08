import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {GlobalRouter} from './Router';

const root = ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <GlobalRouter/>
    </BrowserRouter>
);

// export default Index