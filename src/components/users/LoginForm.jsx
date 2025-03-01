import React, { useEffect, useState } from "react";
import { useUsers } from "../../context/UsersContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { user: realUser, login } = useUsers();
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorDisplayVal, setErrorDisplayVal] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isAuth changed: ", realUser.isAuth);
    if (realUser.isAuth) navigate("/bookmarks");
  }, [realUser, navigate]);

  useEffect(() => {
    realUser.error !== null
      ? setErrorDisplayVal("block")
      : setErrorDisplayVal("none");
  }, [realUser.error]);

  function handleUsername(e) {
    setUser((pre) => {
      return { ...pre, username: e.target.value };
    });
  }

  function handlePassword(e) {
    setUser((pre) => {
      return { ...pre, password: e.target.value };
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    await login(user.username, user.password);
    (await realUser.error) !== null
      ? setErrorDisplayVal("block")
      : setErrorDisplayVal("none");
  }

  return (
    <div>
      <h1 className="my-5 text-center text-lg font-bold">
        ورود به صفحه کاربری
      </h1>
      <form className="md:w-1/3 mx-auto my-4 p-10 sm:w-full rounded-md shadow-sm bg-white">
        <ErrorMessage message={realUser?.error} styleVal={errorDisplayVal} />
        <div className="w-full my-4 p-2">
          <label htmlFor="username" className="w-full inline-block my-2">
            {" "}
            نام کاربری{" "}
          </label>
          <input
            type="text"
            name="username"
            value={user?.username}
            onChange={handleUsername}
            className="w-full rounded-md border-gray-300 border-1 p-3 h-9 hover:border-[#092E33]"
          />
        </div>
        <div className="w-full my-4 p-2">
          <label htmlFor="password" className="w-full inline-block my-2">
            {" "}
            رمز عبور
          </label>
          <input
            type="text"
            name="password"
            value={user?.password}
            onChange={handlePassword}
            className="w-full rounded-md border-gray-300 border-1 h-9 p-3 hover:border-[#092E33]"
          />
        </div>
        <div className="w-full mt-6 mb-3 p-2">
          <button
            className="w-full h-9 rounded-md bg-[#092E33] hover:bg-[#43585B] text-white"
            onClick={handleLogin}
          >
            ورود
          </button>
        </div>
      </form>
    </div>
  );
}

function ErrorMessage({ message, styleVal }) {
  return (
    <p className="errorP" style={{ display: styleVal }}>
      {message}
    </p>
  );
}

export default LoginForm;
