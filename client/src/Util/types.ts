export interface User {
  exists: boolean;
}

export interface ChattingRoom {
  roomId: string;
}

export interface SignupData {
  email: string;
  password: string;
  nickName: string;
}

export interface UserToken {
  userId: number;
  exp: number;
  iat: number;
}

export interface UserProfile {
  nickName: string;
  email: string;
  profileImgUrl: string;
  userDivision: boolean;
  socialType: string;
  address?: string;
}

export interface PatchUserProfile {
  userId: string;
  nickName: string;
  password?: string;
  address?: string;
  profileImgUrl?: string;
}
