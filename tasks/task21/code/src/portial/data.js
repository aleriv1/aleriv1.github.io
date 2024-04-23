// export const messages = [
//     { id: 1 , id_user:100 , name: 'VG', message: 'Привет как дела?'    },
//     { id: 2 , id_user:200 , name: 'NG', message: 'хорошо'    },
//     { id: 3 , id_user:100 , name: 'VG', message: 'Пойдем погуляем !'    },
//     { id: 4 , id_user:200 , name: 'NG', message: 'Пойдем '    },
//     { id: 5 , id_user:100 , name: 'VG', message: 'Выхожу'    },

// ]

export const Storage = {
  addMessage: function (item) {
    if (!window.localStorage["messages"]) {
      window.localStorage["messages"] = JSON.stringify([item]);
    } else {
      const messages = JSON.parse(window.localStorage["messages"]);
      console.log(`messages after parse`, messages);
      console.log(`typeof messages after parse`, typeof messages);
      messages.push(item);
      window.localStorage["messages"] = JSON.stringify(messages);
    }
  },
  getListMessage: function () {
    if (!window.localStorage["messages"]) {
      return [];
    }
    return JSON.parse(window.localStorage["messages"]);
  },
  delMsgData: function (item) {
    const messages = JSON.parse(window.localStorage["messages"]);
    // console.log(messages.splice(messages.indexOf(item), 1));
    messages.splice(messages.indexOf(item), 1);
    // messages.splice(messages.indexOf(item) - 1, 1);
    window.localStorage["messages"] = JSON.stringify(messages);
  },
  destroy: function () {
    window.localStorage.clear();
  },
};
