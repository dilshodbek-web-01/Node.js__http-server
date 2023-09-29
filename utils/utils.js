import fs from "fs";
import path from "path";

const read = (fileName) => {
  return JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), `/object/${fileName}.json`),
      "utf8"
    )
  );
};

const write = (fileName, data) => {
  fs.writeFileSync(
    path.join(process.cwd(), `/object/${fileName}.json`),
    JSON.stringify(data, null, 4)
  );
};

export { read, write };
