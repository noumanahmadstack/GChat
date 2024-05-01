import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import LinearGradient from 'react-native-linear-gradient';
import { getAllConversation } from '../redux/chat/action';
import { useDispatch, useSelector } from 'react-redux';
import { clearChatConversation, setChatConversation } from '../redux/chat/reducer';
import io from 'socket.io-client';
import { baseURL } from '../api/requestHandlers/baseURLs';
import SenderMessage from '../components/MessageFormats/SenderMessage';
import RecieverMessage from '../components/MessageFormats/RecieverMessage';
const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#23BD89',
          marginBottom: 30,
          borderRadius: 10,
          maxWidth: '70%',
        },
        left: {
          backgroundColor: '#1D1D1D',
          maxWidth: '70%',
          marginTop: 40,
          borderRadius: 10,
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
          fontFamily: 'Poppins-Regular',
          paddingVertical: 4,
        },
        left: {
          color: '#BBBBBB',
          fontFamily: 'Poppins-Regular',
          paddingVertical: 4,
        },
      }}
      bottomContainerStyle={{
        right: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
      }}
      renderTime={renderTime}
      renderTicks={renderTicks}
      timeTextStyle={{
        right: {
          display: 'none',
        },
      }}
    />
  );
};

const renderSend = props => {
  return (
    <Send {...props} containerStyle={styles.sendButtonContainer}>
      <Image
        source={require('../assets/icons/sendIcon.png')}
        style={styles.sendButton}
      />
    </Send>
  );
};

const renderInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      textInputStyle={styles.textInput}
      primaryStyle={{ alignItems: 'center' }}
    />
  );
};

const CustomAvatar = ({ user }) => {
  const initials =
    user && user.name
      ? user.name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()
      : '?';

  return (
    <LinearGradient
      colors={['#23BD89', '#0F8B75']}
      style={styles.avatarContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <Text style={styles.avatarText}>{initials}</Text>
    </LinearGradient>
  );
};

const renderTime = props => {
  const date = props.currentMessage.createdAt;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Converts "0" to "12"
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return <Text style={styles.timeText}>{timeString}</Text>;
};

const renderTicks = message => {
  return (
    <Image
      source={require('../assets/icons/messageReadText.png')}
      style={styles.tickImage}
    />
  );

  return null;
};


export default function ChatScreen({ route, navigation }) {

  const { name, project_id, lead_id } = route.params;
  const [isToggled, setIsToggled] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { chatConversation, isLoading } = useSelector((state) => state.chatReducer);
  const [id, setId] = useState('');
  const { userData } = useSelector((state) => state.userReducer)
  const ref_list = useRef()
  const [content, setContent] = useState('')
  const uniq = () => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    setId(uniqueId)
    return uniqueId
  }

  const userId = userData?.data?.user?._id
  const dispatch = useDispatch()
  const socket = io(baseURL, {
    extraHeaders: {
      'auth-token': userData.token
    }

  });
  useEffect(() => {
    // dispatch(clearChatConversation());
    socket.on('connect', (data) => {
      console.log(socket.connected, "hello this is ");
      // setConnected(socket.connected)
    });
    getAllConversation(project_id, lead_id)
    // Clean up the socket connection on component unmount

    formatChatResponse();


    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Have you done it?',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1, // The _id 1 hetch the _id in the user prop of <GiftedChat />
    //       name: 'Current User',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },

    //   {
    //     _id: 2,
    //     text: 'Hi I am waiting for you',
    //     createdAt: new Date(),

    //   },
    //   {
    //     _id: 3,
    //     text: 'Hi I am waiting for you',
    //     createdAt: new Date(),

    //   },

    // ]);
  }, [project_id, lead_id,]);



  const formatChatResponse = () => {
    const formattedChat = chatConversation?.map((message) => (
      {
        _id: message._id,
        text: message.content,
        // prevNode: message.prevNode,
        // project: message.project,
        // receiver: message.receiver._id, // Assuming you want to extract the _id from the receiver object
        createdAt: new Date(message.createdAt),
        user: {
          _id: message?.receiver?._id
        }
        // uID: uniq()
      }));
    setMessages(formattedChat)
  }

  const animatedValue = useRef(new Animated.Value(1)).current;

  const animateSwitch = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      setIsToggled(!isToggled);

      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    });
    status()
  };
  console.log(lead_id);


  const status = () => {
    socket.emit('update_ai_status', { leadId: lead_id });
  }
  const send = () => {
    const lastIndex = chatConversation.length - 1;
    let prevNodeValue = ''
    if (lastIndex >= 0) {
      const lastElement = chatConversation[lastIndex];
      prevNodeValue = lastElement.prevNode;

    }
    const msg = {
      content,
      prevNode: prevNodeValue,
      project: project_id,
      receiver: lead_id,
      uID: uniq()
    };
    const lead = lead_id
    socket.emit('message_send', msg,lead);
    // socket.emit('message_receive_ack', msg.uID, leadId);
    // console.log(`Admin with ID ${lead_id} received message with ID ${msg.uID}`);
    socket.on('message_receive', (msg) => {
      console.log('Message received:', msg);
      const newmessage = {
        _id: msg._id,
        text: msg.content,
        // prevNode: message.prevNode,
        // project: message.project,
        // receiver: message.receiver._id, // Assuming you want to extract the _id from the receiver object
        createdAt: new Date(msg.createdAt),
        user: {
          _id: msg?.receiver?._id
        }
        // uID: uniq()
      }
      msg.senderRole !== 'User' &&
      (
      setMessages(previousMessages => GiftedChat.append(previousMessages, newmessage))
      )

      
      // Perform any necessary operations with the received message
    });
  }
  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    send()
  }, [content])
  // socket.on('update_lead_status', (userId) => {
  //   console.log(`Received update_lead_status event for user ${userId}. Status:`);
  // });

  const checkLeadStatus = (lead_id, callback) => {
    // Emit the "Check_status" event with the lead ID
    socket.emit('Check_status', { leadId: lead_id });

    // Listen for the response from the server
    socket.on('Check_status_response', (response) => {
      callback(response);
    });
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}>
            <Image
              style={styles.arrowBackIcon}
              source={require('../assets/icons/arrowBack.png')}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.name}>{name}</Text>

            <Text style={styles.onlineText}>Online</Text>
          </View>

          <TouchableOpacity onPress={animateSwitch}>
            <Animated.Image
              style={[
                styles.switchAnimatedIcon,
                {
                  transform: [
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
              source={
                isToggled
                  ? require('../assets/icons/crossiconHeader.png')
                  : require('../assets/icons/checkiconHeader.png')
              }
            />
          </TouchableOpacity>
        </View>


        {
          isLoading ? (
            <ActivityIndicator size='small' />
          ) : (
            <View
              style={styles.giftedChatContainer}
            >
              <GiftedChat
                messages={messages}
                onSend={newmessages => onSend(newmessages)}
                user={{
                  _id: userData?.data?.user?._id,
                  name: name,
                }}
                alignTop
                infiniteScroll={false}
                alwaysShowSend
                scrollToBottom
                minInputToolbarHeight={45}
                renderAvatarOnTop
                bottomOffset={350}
                renderBubble={renderBubble}
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                placeholder="Zadajte svoju správu..."
                renderDay={() => null}
                renderAvatar={props =>
                  props.user ? <CustomAvatar user={props.user} /> : null
                }
                isTyping={isTyping}
                onInputTextChanged={text => {
                  setIsTyping(text.length > 0);
                  setContent(text)
                }}
              />
            </View>
          )
        }


        {/* <FlatList
                            ref={ref_list}
                            data={chatConversation}
                            onContentSizeChange={contentChanged}
                            renderItem={renderChats}
                        />
                         <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="Write your message"
                                        placeholderTextColor={'#797C7B'}
                                        style={styles.actualInput}
                                        onSubmitEditing={sendMessage}
                                        value={message}
                                        onChangeText={(data) => setMessage(data)}
                                    />
                                </View> */}
        {/* <FlatList
            contentContainerStyle={{ margin: 10}}
            ref={ref_list}
            data={messages}
            onContentSizeChange={contentChanged}
            renderItem={renderChats}
          />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Zadajte svoju správu..."
              placeholderTextColor={'#797C7B'}
              style={styles.actualInput}
              // onSubmitEditing={send}
              value={message}
              onChangeText={(data) => setMessage(data)}
            />
            <TouchableOpacity style={styles.sendButtonContainer} onPress={send}>
              <Image
                source={require('../assets/icons/sendIcon.png')}
                style={styles.sendButton}
              />
            </TouchableOpacity>
          </View> */}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 10,
  },
  inputContainer: {
    // marginVertical:10,
    flexDirection: "row",
    bottom: 0,
    backgroundColor: "#c5c5c5",
    borderRadius: 12,
    height: 50,
    width: "100%"
  },
  actualInput: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 0,
    color: "black"
  },
  arrowBackIcon: {
    width: 23.5,
    height: 15.9,
    marginTop: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  onlineText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    textAlign: 'center',
    marginTop: 2,
  },
  switchAnimatedIcon: {
    width: 64,
    height: 27.11,
    resizeMode: 'contain',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 35,
    marginHorizontal: 10,
  },
  avatarText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  tickView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickImage: {
    width: 12.35,
    height: 8.78,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  inputToolbar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  textInput: {
    color: '#fff',
    backgroundColor: '#0D0D0D',
    borderRadius: 100,
    paddingLeft: 20,
    marginRight: 10,
    minHeight: 50,
    paddingVertical: 10,
    paddingTop: 17,
    paddingBottom: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  sendButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    alignSelf: "center"
  },
  sendButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  timeText: {
    color: '#fff',
    fontSize: 10,
    marginRight: 5,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  tickImage: {
    width: 12,
    height: 8,
    resizeMode: 'contain',
    marginRight: 8,
    marginBottom: 10,
  },
  typingIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  typingIndicatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  typingIndicatorAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typingIndicatorDots: {
    width: 40,
    height: 10,
    resizeMode: 'contain',
  },
  giftedChatContainer:
  {
    flex: 1,
    backgroundColor: '#0D0D0D',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,

  }
});
