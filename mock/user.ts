import { MockMethod } from "vite-plugin-mock";
import { getRequestToken, requestParams, resultError, resultSuccess } from "./_util";
import { LoginParams } from "/@/api/model/userModel";

export function createFakeUserList() {
  return [
    {
      userId: "1",
      userName: "wujieli",
      realName: "wujieli",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      homePath: "/dashboard/analysis",
      roles: [
        {
          roleName: "Super Admin",
          value: "super",
        },
      ],
    },
  ];
}

export default [
  {
    url: "/api/login",
    timeout: 200,
    method: "post",
    response: ({ body }: { body: LoginParams }) => {
      const { userName, password } = body;
      const checkUser = createFakeUserList().find((item) => {
        return item.userName === userName && item.password === password;
      });
      if (!checkUser) {
        return resultError("账号或密码不正确");
      }

      const { userId, userName: _userName, token, realName, desc, roles } = checkUser;

      return resultSuccess({
        userId,
        userName: _userName,
        token,
        realName,
        desc,
        roles,
      });
    },
  },
  {
    url: "/api/getUserInfo",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return resultError("Token 不存在");
      }

      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("人员信息不存在");
      }

      return resultSuccess(checkUser);
    },
  },
] as MockMethod[];
