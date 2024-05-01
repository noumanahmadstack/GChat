import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState,useRef} from 'react';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';
import { getAllChat, getAllConversation, getAllLeads } from '../redux/chat/action';
import { useSelector } from 'react-redux';


const {width, height} = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    name: 'Peter',
    avatar: require('../assets/images/peter.png'),
    isActive: false,
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Martin',
    avatar: require('../assets/images/martin.png'),
    isActive: false,
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Maya',
    avatar: require('../assets/images/maya.png'),
    isActive: false,
    unreadCount: 2,
  },
  {
    id: '4',
    name: 'Tony',
    avatar: require('../assets/images/tony.png'),
    isActive: false,
  },
  {
    id: '5',
    name: 'Ondrej',
    avatar: require('../assets/images/peter.png'),
    isActive: false,
  },
  {
    id: '6',
    name: 'Ondrej',
    avatar: require('../assets/images/martin.png'),
    isActive: false,
  },
];

const CONVERSATIONS = [
  {
    id: 'c1',
    name: 'Salina Desuza',
    message: 'Hi! I am waiting for you',
    unreadCount: 5,
  },
  {
    id: 'c2',
    name: 'James Watermore',
    message: 'Ok great!👍👍',
    unreadCount: 0,
  },
  {
    id: 'c3',
    name: 'Julia',
    message: 'It is gona be fun 😉😁✌️',
    unreadCount: 2,
  },
  {
    id: 'c4',
    name: 'Alex Jazz',
    message: 'Yep!',
    unreadCount: 0,
  },
  {
    id: 'c5',
    name: 'Amanda',
    message: 'Yes you are right',
    unreadCount: 0,
  },
];

const Item = ({ item, onPress, borderColor, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <View
      style={{
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 50,
        borderColor: borderColor,
      }}>
      <Image source={{uri: item.avatar}} style={[styles.avatar, style]} />
    </View>
    {item.need_support > 0 && (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{item.need_support}</Text>
      </View>
    )}
    <Text style={[styles.name, style]}>{item.agent_name}</Text>
  </TouchableOpacity>
);

const ConversationItem = ({name, message, unreadCount,navigation,project_id,lead_id}) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');

  const textColor = unreadCount > 0 ? '#fff' : '#868686';

  return (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate('ChatScreen', { name, message ,project_id,lead_id});
    }}
    activeOpacity={0.5} style={styles.conversationItem}>
      <LinearGradient
        colors={['#23BD89', '#0F8B75']}
        style={styles.avatarInitialsContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text style={styles.avatarInitials}>{initials}</Text>
      </LinearGradient>

      <View style={{flex: 1, marginLeft: 15}}>
        <Text style={[styles.conversationName, {color: textColor}]}>
          {name}
        </Text>
        <Text style={[styles.conversationMessage, {color: textColor}]}>
          {message}
        </Text>
      </View>
      {unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
        </View>
      )}
      <View style={styles.seprator} />
    </TouchableOpacity>
  );
};

export default function MessagesScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [viewableItems, setViewableItems] = useState([]);
  const {chat,conversation} = useSelector((state) => state.chatReducer)
  const {userData} = useSelector((state) => state.userReducer)

  // Define the configuration for what counts as a viewable item
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80 
  };
  const onViewableItemsChangedRef = useRef(({ viewableItems }) => {
    // Extract the ids of the viewable items
    const ids = viewableItems.map(item => item.item._id);
    setViewableItems(ids);
  });
  useEffect(()=>{
    getAllChat()
    // setSelectedId(chat[0]._id);
    },[])
  const handlePressAvatar = _id => {
    if (!isLoading) {
      setSelectedId(_id);
      setIsLoading(true);
      getAllLeads(_id)
      // Simulate a delay to fetch chat messages, like a network request
      setTimeout(() => {
        setIsLoading(false);
      }, 1200); // Delay in milliseconds (1.2 seconds)
    }
  };
  const renderItem = ({ item }) => {
    const borderColor = item._id === selectedId ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    
    // Determine if the item is fully viewable
    const isViewable = viewableItems.includes(item._id);
    const opacityStyle = isViewable ? { opacity: 1 } : { opacity: 0.5 };
  
    return (
      <Item
        item={item}
        onPress={() => handlePressAvatar(item._id)}
        borderColor={borderColor}
        style={opacityStyle}
      />
    );
  };
  

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const renderConversationItem = ({item}) => {
    const isActive = selectedId === item._id;
    return (
      <ConversationItem
        name={item?.name}
        message={item?.last_message?.content}
        unreadCount={item.unreadCount}
        isActive={isActive}
        navigation={navigation}
        project_id={item.project._id}
        lead_id={item._id}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#000" translucent = {true}/>  
    <View style={styles.livechatheaderContainer}>
        <Text style={styles.liveChatText}>Live Chat</Text>

        <TouchableOpacity>
          <Image
            style={styles.headerAvatar}
            source={require('../assets/icons/liveChatHeaderAvatar.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/icons/serachIcon.png')} 
          style={styles.icon}
        />
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Zadajte hľadané údaje..."
          style={styles.input}
          placeholderTextColor="#999"
        />
      </View>

      <View>
        <LinearGradient
          colors={['#23BD89', '#0F8B75']}
          style={styles.gradientContainer}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.myAiChatsContainer}>
            <Text style={styles.myAiChatsText}>Moje AI chaty</Text>
          </View>
          <View>
          <FlatList
          horizontal
          data={chat}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          extraData={selectedId}
          showsHorizontalScrollIndicator={false}
          // onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChangedRef.current}
          contentContainerStyle={styles.contentContainer}
        />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.blackFooterContainer}>
        <Text style={styles.conversationText}>Konverzácie</Text>
        <ScrollView>
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#23BD89" />
            </View>
          )}

          {isLoading === false && (
            <View>
              <FlatList
                data={conversation}
                renderItem={renderConversationItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  livechatheaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 40,
  },
  liveChatText: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  headerAvatar: {
    width: 48,
    height: 48,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.08)',
    paddingHorizontal: 24,
    borderRadius: 100,
    width: width - 47,
    minHeight: 48,
    alignSelf: 'center',
    marginTop: 40,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 16,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  gradientContainer: {
    width: width,
    height: 272,
    borderRadius: 32,
    marginTop: 32,
  },
  myAiChatsText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginTop: 32,
    marginHorizontal: 24,
  },
  item: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 35,
  },
  name: {
    fontSize: 12,
    marginTop: 6,
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
  flatList: {},
  badgeContainer: {
    position: 'absolute',
    right: -3,
    top: -2,
    backgroundColor: '#108D76',
    borderRadius: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  contentContainer: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingRight: 30,
  },
  blackFooterContainer: {
    width: width,
    height: height / 2.1,
    backgroundColor: '#000',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    position: 'absolute',
    bottom: 0,
  },
  conversationText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    marginTop: 30,
    marginHorizontal: 24,
    marginBottom: 15,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    borderBottomWidth: 1,
  },
  avatarInitialsContainer: {
    width: 48,
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  conversationName: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  conversationMessage: {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  unreadBadge: {
    backgroundColor: '#108D76',
    borderRadius: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 23,
  },
  unreadBadgeText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  seprator: {
    width: width / 1.3,
    height: 1,
    backgroundColor: '#252525',
    position: 'absolute',
    bottom: -13,
    right: 0,
  },
  loaderContainer: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 20,
    // bottom: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
