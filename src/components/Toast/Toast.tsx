import "./Toast.css";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  isClosing?: boolean;
};

function Toast(props: ToastProps) {
  const { message, type, isClosing = false } = props;

  return (
    <div className={`toast-component ${type} ${isClosing ? "closing" : ""}`}>
      <p>{message}</p>
    </div>
  );
}

export default Toast;
