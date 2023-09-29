import http from "http";
import { read, write } from "../utils/utils.js";

const bodyParser = (request) => {
  return new Promise((resolve, reject) => {
    try {
      request.on("data", (chunk) => {
        resolve(JSON.parse(chunk));
      });
    } catch (error) {
      reject();
    }
  });
};

http
  .createServer(async (request, response) => {
    if (request.url === "/get" && request.method === "GET") {
      const readCars = read("cars");
      const readProperty = read("property");
      const allReadData = readCars.filter((e) => {
        readProperty.filter((i) => {
          if (e.car_id === i.property_id) {
            e.properties = i;
            delete i.property_id;
          }
        });
        return e;
      });
      response.end(JSON.stringify(allReadData));
    }

    // if (request.url == "/post/cars" && request.method == "POST") {
    //   const data = await bodyParser(request);
    //   const readCars = read("cars");
    //   data.car_id = readCars[readCars.length - 1].car_id + 1;
    //   write("cars", [...readCars, data]);
    //   response.end("success");
    // }

    // if (request.url == "/post/property" && request.method == "POST") {
    //   const data = await bodyParser(request);
    //   const readProperty = read("property");
    //   data.property_id = readProperty[readProperty.length - 1].property_id + 1;
    //   write("property", [...readProperty, data]);
    //   response.end("success");
    // }
  })
  .listen(5577, () => {
    console.log("Ishladi.");
  });

// JSON - JavaScript Object Notation.
