import * as React from "react";
import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import useToggle from "../hooks/useToggle";

export default function Home() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginLoading, { toggle: toggleLoginLoading }] = useToggle();

  const handleSubmit = async (event) => {
    event.preventDefault();
    toggleLoginLoading();
    try {
      const request = await axios.post('/api/v1/auth', {
        username, password,
      });
      localStorage.setItem('userId', request.data.data._id);
      Router.push('/messages');
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoginLoading();
    }
  }
  return (
    <div>
      <Head>
        <title>Branch</title>
        <meta name="description" content="Branch International" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-center">Login to view Messages</h3>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <div>
                  <label className="block" htmlFor="username">Username</label>
                  <input type="text" placeholder="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="mt-4">
                  <label className="block">Password</label>
                  <input type="password" placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <button disabled={loginLoading} type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
