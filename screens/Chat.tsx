import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import {
  getMessageList,
  addMessageListener,
  removeMessageListener,
  sendMessage,
  IChatMessageResponsePayload,
  IMessageListenerCallbackArgs,
  isChatUserMessageResponsePayload,
} from "@livelike/javascript";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useTheme } from "../hooks/useTheme";

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

const EMPTY_CHAT_MESSAGE_LIST: IChatMessageResponsePayload[] = [];

function ChatMessageList({ roomId }: ChatroomProps) {
  const [messages, setMessages] = useState(EMPTY_CHAT_MESSAGE_LIST);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    getMessageList(roomId).then((res) => {
      setMessages(res.messages);
    });
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd();
    }
    function onMessage({ event, message }: IMessageListenerCallbackArgs) {
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
          renderItem={({ item }) => <ChatMessageItem messageDetails={item} />}
          keyExtractor={(message) => message.id}
        />
      </View>
      <ChatMessageInput />
    </View>
  );
}

function ChatMessageItem({
  messageDetails,
}: {
  messageDetails: IChatMessageResponsePayload;
}) {
  const {
    text: textColor,
    secondaryText: secondaryTextColor,
    background: backgroundColor,
    secondaryBackground,
  } = useTheme();
  if (!isChatUserMessageResponsePayload(messageDetails)) {
    return null;
  }
  return (
    <View style={messageItemStyles.container}>
      <Image
        style={messageItemStyles.profileImage}
        source={
          messageDetails.sender_image_url ||
          require("../assets/images/avatar.png")
        }
      />
      <View style={messageItemStyles.itemDetails}>
        <View style={messageItemStyles.itemHeader}>
          <Text style={messageItemStyles.userName}>
            {messageDetails.sender_nickname}
          </Text>
          <Text
            style={[{ color: secondaryTextColor }, messageItemStyles.timeStamp]}
          >
            {new Date(messageDetails.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
        </View>
        <View
          style={[
            { backgroundColor: secondaryBackground },
            messageItemStyles.textContainer,
          ]}
        >
          <Text style={messageItemStyles.textContent}>
            {messageDetails.message}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ChatMessageInput() {
  const {
    text: textColor,
    secondaryBackground,
    accent: accentColor,
  } = useTheme();
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
        style={[
          { backgroundColor: secondaryBackground, color: textColor },
          messageInputStyles.input,
        ]}
        onChangeText={setInputValue}
        value={inputValue}
        editable={!isSendingMessage}
        multiline
      />
      <Pressable
        onPress={onSendMessage}
        accessibilityLabel="Send Message"
        disabled={isSendingMessage}
        style={[{ backgroundColor: accentColor }, messageInputStyles.button]}
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
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 10,
    marginVertical: 5,
  },
  profileImage: {
    borderRadius: 50,
    height: 40,
    width: 40,
    marginRight: 15,
    alignItems: "flex-start",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
  },
  itemHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    marginRight: 10,
  },
  timeStamp: {
    fontSize: 12,
  },
  textContainer: {
    alignSelf: "flex-start",
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    flexWrap: "wrap",
    maxWidth: "95%",
    minWidth: "75%",
  },
  textContent: {
    alignSelf: "flex-start",
  },
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
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    height: "100%",
    width: "20%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
