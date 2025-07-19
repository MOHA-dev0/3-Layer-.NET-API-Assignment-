import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import api from "../services/api";

interface StudentFormProps {
  mode?: "create" | "edit";
  initialValues?: { id?: number; name?: string; email?: string };
  onSuccess: () => void;
  onCancel?: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({
  mode = "create",
  initialValues = {},
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [mode, initialValues, form]);

  const handleSubmit = async (values: { name: string; email: string }) => {
    try {
      if (mode === "create") {
        await api.post("/student", values);
        messageApi.success("Student created successfully!");
      } else {
        await api.put(`/student/${initialValues.id}`, values);
        messageApi.success("Student updated successfully!");
      }
      form.resetFields();
      onSuccess();
    } catch (err) {
      messageApi.error("Operation failed. Please try again.");
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {mode === "create" ? "Create" : "Update"}
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.resetFields();
              onCancel?.();
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default StudentForm;
