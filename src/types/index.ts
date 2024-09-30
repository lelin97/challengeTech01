export type ReturnMock<T extends any = any> =
  | {
      sucess: true;
      data: T;
      message?: string | undefined;
    }
  | {
      sucess: false;
      message: string;
      error: string;
    };
