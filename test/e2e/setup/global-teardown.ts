import { stopMockServer } from "../helpers/mock-server";

export default async function globalTeardown() {
  await stopMockServer();
}
