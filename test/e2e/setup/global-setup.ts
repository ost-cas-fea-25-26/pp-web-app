import { startMockServer } from "../helpers/mock-server";

export default async function globalSetup() {
  await startMockServer();
}
