import { useEffect, useState, useRef } from "react";
import { StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import {
  getMessageList,
  addMessageListener,
  removeMessageListener,
  sendMessage,
} from "@livelike/core-api";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export type ChatroomProps = {
  roomId: string;
};

const CHATROOM_ID = "6c5577e7-95cf-40ff-9a29-a6f57d0da322";

export default function Chatroom({
  navigation,
  route,
}: RootTabScreenProps<"Chatroom">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatroom Id: {CHATROOM_ID}</Text>
      <ChatMessageList roomId={CHATROOM_ID} />
    </View>
  );
}

function ChatMessageList({ roomId }) {
  const [messages, setMessages] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    getMessageList(roomId).then((res) => {
      setMessages(res.messages);
    });
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd();
    }
    function onMessage({ event, message }) {
      if (event === "messagereceived") {
        setMessages([...messages, message]);
      }
    }
    addMessageListener(
      {
        roomId,
      },
      onMessage
    );

    return () => {
      removeMessageListener({ roomId }, onMessage);
    };
  }, [messages]);

  return (
    <View style={messageListStyles.container}>
      <View style={messageListStyles.listContainer}>
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={ChatMessageItem}
          keyExtractor={(message) => message.id}
        />
      </View>
      <ChatMessageInput />
    </View>
  );
}

function ChatMessageItem({ item: messageDetails }) {
  return (
    <View style={messageItemStyles.container}>
      <Text style={messageItemStyles.userName}>
        {messageDetails.sender_nickname}
      </Text>
      <Text style={messageItemStyles.textContent}>
        {messageDetails.message}
      </Text>
      <Text style={messageItemStyles.timeStamp}>
        {new Date(messageDetails.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </Text>
    </View>
  );
}

function ChatMessageInput() {
  const [inputValue, setInputValue] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const onSendMessage = () => {
    if (!inputValue) {
      return;
    }
    setIsSendingMessage(true);
    sendMessage({
      roomId: CHATROOM_ID,
      message: inputValue,
    })
      .then(() => {
        setInputValue("");
      })
      .finally(() => {
        setIsSendingMessage(false);
      });
  };

  return (
    <View style={messageInputStyles.container}>
      <TextInput
        style={messageInputStyles.input}
        onChangeText={setInputValue}
        value={inputValue}
        editable={!isSendingMessage}
        multiline
      />
      <Pressable
        onPress={onSendMessage}
        accessibilityLabel="Send Message"
        disabled={isSendingMessage}
        style={messageInputStyles.button}
      >
        <Text>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 14,
    paddingVertical: 10,
  },
});

const messageListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 55,
    paddingRight: 10,
    // height: "85%",
  },
});

const messageItemStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignSelf: "flex-start",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 10,
  },
  userName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  timeStamp: {
    paddingTop: 5,
    fontSize: 12,
  },
  textContent: {},
});

const messageInputStyles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    height: 55,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    width: "80%",
    marginRight: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#27bf9d",
    height: "100%",
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
