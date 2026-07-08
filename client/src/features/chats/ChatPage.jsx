import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageComposer,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
  
import { getStreamToken } from '../services/api';
import ChatLoader from '../../components/ChatLoader';
import CallButton from '../../components/CallButton';
import useAuthUser from '../../hook/useAuthUser';
import toast from 'react-hot-toast';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authUser } = useAuthUser();
  const [channel, setChannel] = useState(null);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  // 👇 memoize userData so its reference only changes when authUser actually changes
  const userData = useMemo(() => ({
    id: authUser?._id,
    name: authUser?.fullName,
    image: authUser?.profilePic,
  }), [authUser?._id, authUser?.fullName, authUser?.profilePic]);

  const chatClient = useCreateChatClient({
    apiKey: STREAM_API_KEY,
    userData,
    tokenOrProvider: tokenData?.token,
  });

  React.useEffect(() => {
    const initChannel = async () => {
      if (!chatClient || !authUser || !targetUserId) return;
      try {
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currChannel = chatClient.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currChannel.watch({ presence: true });
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing channel:", error);
        toast.error("Could not connect to chat. Please try again.");
      }
    };
    initChannel();
  }, [chatClient, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (!chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageComposer focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage