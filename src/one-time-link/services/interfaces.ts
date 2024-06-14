export interface ICreateLinkInput {
  text: string;
}

export interface IProcessLinkInput {
  hash: string;
}

export interface IOneTimeLinkService {
  createLink(input: ICreateLinkInput): Promise<[string, ECreateErrorCode]>;
  processLink(input: IProcessLinkInput): Promise<[string, EProcessErrorCode]>;
}

export enum ECreateErrorCode {
  storage,
  conflict,
}

export enum EProcessErrorCode {
  storage,
  notFound,
}
