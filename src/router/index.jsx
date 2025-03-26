import { Box, Stack } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import TopHeader from "../components/TopHeader";
// import SideMenu from "../components/side_menu";

const pages = import.meta.glob("../pages/**/*.jsx", { eager: true });

const generateRoutes = (files) => {
    const routeTree = {};

    Object.keys(files).forEach((path) => {
        const relativePath = path.replace("../pages/", "").replace(".jsx", "");
        const parts = relativePath.split("/"); // Tách đường dẫn thành mảng

        let current = routeTree;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = i === parts.length - 1 ? { element: files[path].default } : {}; // Nếu là file cuối thì gán component
            }
            current = current[part]; // Đi vào cấp tiếp theo trong object
        }
    });


    let accessToken = typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null') ? JSON.parse(window.localStorage.getItem("data")).token : "";

    // Hàm đệ quy để chuyển cấu trúc cây thành mảng route
    const convertToRoutes = (obj, basePath = "") =>
        Object.entries(obj).map(([key, value]) => {
            const path = key.toLowerCase() === "index" ? basePath || "/" : `${basePath}/${key.toLowerCase()}`;
            // if (accessToken) {
                return typeof value.element === "function"
                    ? <Route key={path} path={path} element={<value.element />} />
                    : <Route key={path} path={path} element={null}>{convertToRoutes(value, path)}</Route>
            // } else {
            //     return <Route path={path} replace key={path} element={<Login />} />;
            // }
        });
    return convertToRoutes(routeTree);
};

const routes = generateRoutes(pages);

function Routers() {

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // useEffect(() => {
    //     const storedData = typeof window !== "undefined" ? localStorage.getItem("data") : null;

    //     if (storedData && storedData !== "null") {
    //         const parsedData = JSON.parse(storedData);
    //         const token = parsedData.token;
    //         const loginTime = parsedData.loginTime;
    //         const currentTime = Date.now();

    //         // Kiểm tra xem token có hết hạn (24 giờ) hay không
    //         if (!token || currentTime - loginTime > 1000 * 60 * 60 * 24) {
    //             localStorage.removeItem("data");
    //             localStorage.removeItem("authenticated");
    //             setIsAuthenticated(false);
    //         } else {
    //             setIsAuthenticated(true);
    //         }
    //     } else {
    //         setIsAuthenticated(false);
    //     }
    // }, []);

    return (
        <Router>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <> {routes} </>
                            {/* {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />} */}
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </Router>
    );
}

export default Routers;