import app from "./app";

async function main() {
  await app.listen(3005);
  console.log("server on port 3005");
}
main();
