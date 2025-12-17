declare module "mockserver-node" {
  const mockserver: {
    start_mockserver(options: {
      serverPort: number;
      verbose?: boolean;
      trace?: boolean;
      mockServerVersion?: string;
      jvmOptions?: string[];
    }): Promise<void>;

    stop_mockserver(options: { serverPort: number }): Promise<void>;
  };

  export = mockserver;
}
