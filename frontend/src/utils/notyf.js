import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notyf = new Notyf({
  duration: 2000,
  position: { x: "right", y: "top" },
  dismissible: true,
});
