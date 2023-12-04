import React, { useContext, useState } from "react";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { User } from "../util/validation";
import { UserContext } from "../components/UserContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin() {
    try {
      const user = User.parse({
        email,
        password,
      });
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.format());
      }
    }

    const query = new URLSearchParams({
      email,
      password,
      userId: userContext.userId,
    }).toString();
    fetch(`http://localhost:5001/users?${query}`)
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          userContext.onChange(user);
          navigate("/about");
        } else {
          setError("Invalid user");
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  const fillFields = email && password;

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="mt-24 font-bold text-3xl">Login</h1>
      <input
        className=" py-2 px-4 bg-gray-100  hover:bg-gray-200"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error?.email && (
        <div className="text-red-400">{error?.email?._error}</div>
      )}
      <input
        className=" py-2 px-4 bg-gray-100 hover:bg-gray-200 "
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error?.password && (
        <div className="text-red-400">{error?.password?._error}</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {fillFields ? (
        <button
          onClick={handleLogin}
          className=" py-2 px-4 mb-8  bg-gray-300  hover:bg-gray-400 text-black"
        >
          Login
        </button>
      ) : (
        <button disabled className=" py-2 px-4 mb-8  bg-gray-300">
          Login
        </button>
      )}
      <p>
        Not login?
        <Link
          to="/signup"
          className="prose flex gap-2 py-2 px-4 hover:bg-gray-300"
        >
          <button> Sign up</button>
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
