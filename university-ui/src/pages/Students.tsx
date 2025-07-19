import React, { useEffect, useState } from "react";
import { Table, message, Input, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Confirm from "../components/Conform/Conform";
import imageXmark from "@/assets/image.png";

const { Search } = Input;

// Text Constants
const TEXT = {
  DELETE_CONFIRM_MESSAGE: "Are you sure you want to delete this student?",
  DELETE_CONFIRM_SUBMESSAGE: "This action cannot be undone.",
  DELETE_SUCCESS: "Student deleted successfully",
  DELETE_FAILED: "Failed to delete student",
  FETCH_FAILED: "Failed to fetch students",
  UNAUTHORIZED: "Unauthorized, please log in first",
  LOGOUT_SUCCESS: "Logged out successfully",
  SEARCH_PLACEHOLDER: "Search by name",
  SEARCH_BUTTON: "Search",
  ADD_STUDENT: "Add Student",
  LOGOUT: "Logout",
  ID: "ID",
  NAME: "Name",
  EMAIL: "Email",
  PHONE: "Phone",
  ACTIONS: "Actions",
  EDIT: "Edit",
  DELETE: "Delete",
  CONFIRM_MESSAGE: "Are you sure you want to delete this employee ?",
  CONFIRM_DELETE_SUBMESSAGE: "", // Optional sub-message
  CONFIRM_DELETE_TEXT: "DELETE",
  CONFIRM_CANCEL_TEXT: "CANCEL",
};

interface DataType {
  key: string;
  id: number;
  userName: string;
  email: string;
  phone: string;
}

const Students: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/student");
        const mappedData = response.data.result.map((student: any) => ({
          key: student.id.toString(),
          id: student.id,
          userName: student.userName ?? "",
          email: student.email,
          phone: student.phone ?? "",
        }));
        setData(mappedData);
        setFilteredData(mappedData);
        console.log("Fetched students:", mappedData);
      } catch (error: any) {
        if (error.response?.status === 401) {
          message.error(TEXT.UNAUTHORIZED);
        } else {
          message.error(TEXT.FETCH_FAILED);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
    if (value.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((student) =>
        student.userName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success(TEXT.LOGOUT_SUCCESS);
    navigate("/login");
  };

  const hanleAddStudent = () => {
    navigate("/StudentForm");
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/student/${id}`);
      setData((prev) => prev.filter((student) => student.id !== id));
      setFilteredData((prev) => prev.filter((student) => student.id !== id));
      message.success(TEXT.DELETE_SUCCESS);
    } catch (error: any) {
      if (error.response?.status === 401) {
        message.error(TEXT.UNAUTHORIZED);
      } else {
        message.error(TEXT.DELETE_FAILED);
      }
    }
  };

  const handleDeleteUser = () => {
    if (selectedUserId !== null) {
      handleDelete(selectedUserId);
      setConfirmOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setSelectedUserId(null);
  };

  const columns = [
    {
      title: TEXT.ID,
      dataIndex: "id",
      key: "id",
    },
    {
      title: TEXT.NAME,
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: TEXT.EMAIL,
      dataIndex: "email",
      key: "email",
    },
    {
      title: TEXT.PHONE,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: TEXT.ACTIONS,
      key: "actions",
      render: (_text: string, record: DataType) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => navigate(`/StudentUpdateForm/${record.id}`)}
          >
            {TEXT.EDIT}
          </Button>
          <Button
            danger
            onClick={() => {
              setSelectedUserId(record.id);
              setConfirmOpen(true);
            }}
          >
            {TEXT.DELETE}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Space
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Search
          placeholder={TEXT.SEARCH_PLACEHOLDER}
          allowClear
          enterButton={TEXT.SEARCH_BUTTON}
          size="middle"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          onSearch={handleSearch}
          style={{ width: "300px" }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={hanleAddStudent}>{TEXT.ADD_STUDENT}</Button>
          <Button danger onClick={handleLogout}>
            {TEXT.LOGOUT}
          </Button>
        </div>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
      />

      <Confirm
        open={confirmOpen}
        onDelete={handleDeleteUser}
        onCancel={handleCancel}
        message={TEXT.CONFIRM_MESSAGE}
        subMessage={TEXT.CONFIRM_DELETE_SUBMESSAGE}
        deleteText={TEXT.CONFIRM_DELETE_TEXT}
        cancelText={TEXT.CONFIRM_CANCEL_TEXT}
        imageSrc={imageXmark}
      />
    </div>
  );
};

export default Students;
