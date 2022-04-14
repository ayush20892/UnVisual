import axios from "axios";
import { userType } from "../types";
axios.defaults.withCredentials = true;

const { REACT_APP_BACKEND_URL } = process.env;

type authResponseProp = {
  success: Boolean;
  user: userType;
  message: string;
};

type signupProps = {
  name: String;
  email: String;
  password: String;
};
export async function signup({
  name,
  email,
  password,
}: signupProps): Promise<authResponseProp | undefined> {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/signup`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function login(
  email: String,
  password: String
): Promise<authResponseProp | undefined> {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const logout = async () => {
  try {
    await axios.get(`${REACT_APP_BACKEND_URL}/logout`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export async function forgotPassword(email: string) {
  try {
    const res = await axios.post(
      `${REACT_APP_BACKEND_URL}/forgotPassword`,
      {
        email,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function verifyCode(forgotCode: string) {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/verifyCode`,
      {
        forgotCode,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

type passwordResetProps = {
  password: String;
  confirmPassword: String;
};
export async function passwordReset({
  password,
  confirmPassword,
}: passwordResetProps) {
  try {
    const { data } = await axios.post(
      `${REACT_APP_BACKEND_URL}/password/reset`,
      {
        password,
        confirmPassword,
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

type userDashboardType = {
  success: Boolean;
  user: userType;
};
export async function userDashboard(): Promise<userDashboardType | undefined> {
  try {
    const { data } = await axios.get(`${REACT_APP_BACKEND_URL}/userDashboard`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
}

type dataUpdate = {
  name?: String;
  email?: String;
};
export const updateUserData = async (dataUpdate: dataUpdate) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/user/update`,
      data: dataUpdate,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

type updateUserPassowrdProps = {
  oldPassword: String;
  password: String;
  confirmPassword: String;
};
export const updateUserPassowrd = async ({
  oldPassword,
  password,
  confirmPassword,
}: updateUserPassowrdProps) => {
  try {
    const { data } = await axios({
      method: "post",
      url: `${REACT_APP_BACKEND_URL}/password/update`,
      data: {
        oldPassword,
        password,
        confirmPassword,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
