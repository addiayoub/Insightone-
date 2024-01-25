import { v4 as uuidv4 } from "uuid";

function injectId(data) {
  return data.map((item) => ({ id: uuidv4(), ...item }));
}

export const injectMinMax = (data) => {
  return data.map((item) => ({ ...item, min: 0, max: 1 }));
};
export default injectId;
