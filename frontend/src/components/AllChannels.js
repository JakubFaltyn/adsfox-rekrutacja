import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { VictoryPie } from "victory";
import {
  TrashIcon,
  CheckIcon,
  XCircleIcon,
  PencilIcon,
} from "@heroicons/react/solid";

const AllChannels = () => {
  const {
    channels,
    channelLength,
    editMode,
    cancelEdit,
    updateChannel,
    deleteChannel,
  } = useContext(AppContext);

  const [newData, setNewData] = useState({});

  const saveBtn = () => {
    updateChannel(newData);
  };

  const updateNewData = (e, field) => {
    setNewData({
      ...newData,
      [field]: e.target.value,
    });
  };

  const enableEdit = (id, channel_name, channel_clients) => {
    setNewData({ id, channel_name, channel_clients });
    editMode(id);
  };

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteChannel(id);
    }
  };

  let chartData = [];

  return !channelLength ? (
    <p>
      {channelLength === null ? "Loading..." : "Please insert some channels."}
    </p>
  ) : (
    <div>
      <div className="flex-col justify-center items-center">
          <div className="px-20">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Channel name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Number of clients
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {channels.map(
                    ({ id, channel_name, channel_clients, isEditing }) => {
                      chartData[id] = { x: channel_name, y: channel_clients };
                      return isEditing === true ? (
                        <tr key={id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                                <div className="text-sm text-center font-medium text-gray-900">
                                    <input
                                      id="_name"
                                      name="name"
                                      type="text"
                                      autoComplete="off"
                                      defaultValue={channel_name}
                                      required
                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 focus:z-10 sm:text-sm"
                                      onChange={(e) =>
                                        updateNewData(e, "channel_name")
                                      }
                                    />
                                </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                          <div className="text-sm text-gray-900">
                            <input
                                id="_clients"
                                  name="clients"
                                      type="number"
                                      autoComplete="off"
                                      defaultValue={channel_clients}
                                      required
                                      className="max-w-xs appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 focus:z-10 sm:text-sm"
                                      onChange={(e) =>
                                        updateNewData(e, "channel_clients")
                                      }
                                    />
                          </div>
                          </div>
                            
                          </td>
                          <td className="flex items-center justify-center px-6 py-4 whitespace-nowrap">
                            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                              <span className="hidden sm:block">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                                  onClick={() => saveBtn()}
                                >
                                  <CheckIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                  Save
                                </button>
                              </span>
                              <span className="sm:ml-3">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  onClick={() => cancelEdit(id)}
                                >
                                  <XCircleIcon
                                    className="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  Cancel
                                </button>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {channel_name}
                                </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                                <div className="text-sm font-medium text-gray-900">
                                  {channel_clients}
                                </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                                <div className="text-sm font-medium text-gray-900">
                                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                              <span className="hidden sm:block">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                                  onClick={() =>
                                    enableEdit(
                                      id,
                                      channel_name,
                                      channel_clients
                                    )
                                  }
                                >
                                  <PencilIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-white"
                                    aria-hidden="true"
                                  />
                                  Edit
                                </button>
                              </span>
                              <span className="sm:ml-3">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  onClick={() => deleteConfirm(id)}
                                >
                                  <TrashIcon
                                    className="-ml-1 mr-2 h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  Delete
                                </button>
                              </span>
                            </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
      <VictoryPie data={chartData} animate colorScale="blue" width={1000} />
    </div>
  );
};

export default AllChannels;
