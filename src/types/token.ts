export type Tokens = {
  status: string;
  payload: {
    token: string;
    expired: number;
  };
};

export type Expired = {
  status: number;
  payload: {
    expired: number;
  };
}