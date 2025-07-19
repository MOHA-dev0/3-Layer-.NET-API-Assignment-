import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

// Text Constants
const TEXT = {
  UPDATE_LABEL: "Update",
  CANCEL_LABEL: "Cancel",
};

const StudentUpdateForm: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  console.log("Update Form ID:", id);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/student/${id}`);
        form.resetFields();
        form.setFieldsValue({
          name: res.data.result.name,
          email: res.data.result.email,
        });
        console.log("Fetched student data:", res.data.result);
      } catch (err) {
        messageApi.error("Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStudent();
  }, [id, form, messageApi]);

  const handleSubmit = async (values: { name: string; email: string }) => {
    try {
      await api.put(`/student/${id}`, values);
      console.log("Updated student data:", values);
      form.resetFields();
      messageApi.success("Student updated successfully!");
    } catch (err) {
      messageApi.error("Failed to update student");
    }
  };

  return (
    <>
      {contextHolder}
      <h2>Update Student</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name: "", email: "" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Name" disabled={loading} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email Address" disabled={loading} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {TEXT.UPDATE_LABEL}
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => navigate("/")}
            disabled={loading}
          >
            {TEXT.CANCEL_LABEL}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentUpdateForm;
