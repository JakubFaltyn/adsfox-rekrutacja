import { useState, useContext } from "react";
import { AppContext } from "../Context";

const Form = () => {
  const { insertChannel } = useContext(AppContext);
  const [newChannel, setNewChannel] = useState({});

  const addNewChannel = (e, field) => {
    setNewChannel({
      ...newChannel,
      [field]: e.target.value,
    });
  };

  const submitChannel = (e) => {
    e.preventDefault();
    insertChannel(newChannel);
    e.target.reset();
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://adsfox.com/wp-content/uploads/2021/11/adsfox_logo_300px-2.png"
            alt="Adsfox logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Insert new channel
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitChannel}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="_name" className="sr-only">
                Channel name
              </label>
              <input
                id="_name"
                name="name"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 focus:z-10 sm:text-sm"
                onChange={(e) => addNewChannel(e, "channel_name")}
                placeholder="Channel name"
              />
            </div>
            <div>
              <label htmlFor="_clients" className="sr-only">
                Password
              </label>
              <input
                id="_clients"
                name="clients"
                type="number"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 focus:z-10 sm:text-sm"
                onChange={(e) => addNewChannel(e, "channel_clients")}
                placeholder="Number of clients"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              value="Insert"
            >
              Insert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
