import { create } from "zustand";

export type Token = {
  facebookAccessToken: string | undefined;
  googleAccessToken: string | undefined;
};

type tokenState = {
  facebookAccessToken: string;
  googleAccessToken: string;
  setFacebookAccessToken: (facebookAccessToken: string | undefined) => void;
  setGoogleAccessToken: (googleAccessToken: string | undefined) => void;
};

export const useToken = create<tokenState>()((set) => ({
  facebookAccessToken: "",
  googleAccessToken: "",
  setFacebookAccessToken: (tokenFacebook) =>
    set(() => {
      return { facebookAccessToken: tokenFacebook };
    }),
  setGoogleAccessToken: (tokenGoogle) =>
    set(() => ({
      googleAccessToken: tokenGoogle,
    })),
}));
