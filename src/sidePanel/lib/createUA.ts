import { UA, WebSocketInterface } from "jssip";

export type Credentials = {
  address: string;
  username: string;
  password: string
}

export const createUa = (credentials?: Credentials) => {
  if (credentials) {
    const { address, username, password } = credentials

    return new UA({
      sockets: [new WebSocketInterface(`wss://${address}`)],
      uri: `sip:${username}@${address}`,
      password,
    });
  }

  return null
}
