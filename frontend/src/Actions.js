import { useEffect, useState } from "react";

export const Actions = () => {
  let [channels, setChannels] = useState([]);
  let [channelLength, setChannelLength] = useState(null);

  useEffect(() => {
    fetch("https://adsfox-zadanie-backend.herokuapp.com/all-channels.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setChannels(data.channels.reverse());
          setChannelLength(true);
        } else {
          setChannelLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const insertChannel = (newChannel) => {
    fetch("https://adsfox-zadanie-backend.herokuapp.com/add-channel.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChannel),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setChannels([
            {
              id: data.id,
              ...newChannel,
            },
            ...channels,
          ]);
          setChannelLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMode = (id) => {
    channels = channels.map((channel) => {
      if (channel.id === id) {
        channel.isEditing = true;
        return channel;
      }
      channel.isEditing = false;
      return channel;
    });
    setChannels(channels);
  };

  const cancelEdit = (id) => {
    channels = channels.map((channel) => {
      if (channel.id === id) {
        channel.isEditing = false;
        return channel;
      }
      return channel;
    });
    setChannels(channels);
  };

  const updateChannel = (channelData) => {
    fetch("https://adsfox-zadanie-backend.herokuapp.com/update-channel.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(channelData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          channels = channels.map((channel) => {
            if (channel.id === channelData.id) {
              channel.isEditing = false;
              channel.channel_name = channelData.channel_name;
              channel.channel_clients = channelData.channel_clients;
              return channel;
            }
            return channel;
          });
          setChannels(channels);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteChannel = (theID) => {
    let channelDeleted = channels.filter((channel) => {
      return channel.id !== theID;
    });
    fetch("https://adsfox-zadanie-backend.herokuapp.com/delete-channel.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setChannels(channelDeleted);
          if (channels.length === 1) {
            setChannelLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    channels,
    editMode,
    cancelEdit,
    updateChannel,
    insertChannel,
    deleteChannel,
    channelLength,
  };
};