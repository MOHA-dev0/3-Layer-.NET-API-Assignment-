import { Layout, Menu } from "antd";

import "./App.css";
import { Content, Header } from "antd/es/layout/layout";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Student from "./pages/Students";
import RoleRoute from "./components/RoleRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import { logout } from "./auth/auth";
import StudentForm from "./components/StudentForm";
import StudentUpdateForm from "./components/StudentUpdateForm";

function App() {
  const location = useLocation();

  return (
    <>
      <Layout>
        <Header style={{ color: "#ffff" }}>University Management</Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[
            location.pathname === "" ? "Login" : location.pathname,
          ]}
        >
          <Menu.Item key="Login">
            {" "}
            <Link to="/Login">Login</Link>
          </Menu.Item>
          <Menu.Item key="Students">
            {" "}
            <Link to="/Students">Student</Link>
          </Menu.Item>
          <Menu.Item key="Grades">
            {" "}
            <Link to="/Grades">Grades</Link>
          </Menu.Item>
          <Menu.Item key="Logout" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route
              path="/Students"
              element={
                <PrivateRoute>
                  <Student />
                </PrivateRoute>
              }
            />
            <Route
              path="/StudentForm"
              element={
                <PrivateRoute>
                  <StudentForm
                    onSuccess={function (): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/StudentUpdateForm/:id"
              element={
                <PrivateRoute>
                  <StudentUpdateForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/Grades"
              element={
                <RoleRoute allowedRoles={["Teacher"]}>
                  <div>Grades Page</div>
                </RoleRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={<div>You are not authorized to view this page.</div>}
            />
          </Routes>
        </Content>
      </Layout>
    </>
  );
}

export default App;
