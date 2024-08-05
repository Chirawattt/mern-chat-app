import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="flex flex-col py-2 overflow-scroll">
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}

      {conversations.map((conversation, index) => {
        return (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIndex={index === conversations.length - 1}
          />
        );
      })}
    </div>
  );
};
export default Conversations;
