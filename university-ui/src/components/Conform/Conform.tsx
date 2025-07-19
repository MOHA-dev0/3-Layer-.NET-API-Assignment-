import { Button, Image, Modal } from "antd";
import styles from "./Conform.module.scss";

interface ConfirmProps {
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
  message?: string;
  subMessage?: string;
  deleteText?: string;
  cancelText?: string;
  imageSrc?: string;
}

function Confirm({
  open,
  onDelete,
  onCancel,
  message,
  subMessage,
  deleteText = "Delete",
  cancelText = "Cancel",
  imageSrc,
}: ConfirmProps) {
  return (
    <div className={styles.wrapper}>
      <Modal
        centered
        open={open}
        width={464}
        footer={null}
        closable={false}
        className={styles.modal}
        onCancel={onCancel}
      >
        <div className={styles.content}>
          {imageSrc && (
            <Image src={imageSrc} width={164} height={164} preview={false} />
          )}
          <p>{message}</p>
          <p>{subMessage ? subMessage : "\u200B"}</p>
        </div>

        <div className={styles.buttons}>
          <Button className={styles.deleteButton} onClick={onDelete}>
            {deleteText}
          </Button>

          <Button className={styles.cancelButton} onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Confirm;
