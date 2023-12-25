import { v4 as uuidv4 } from "uuid";

function injectId(data) {
  return data.map((item) => ({ id: uuidv4(), ...item }));
}

export default injectId;
