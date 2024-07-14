import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // rename id field to receiverId
    const senderId = req.user._id;

    // find all conversation between these two users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // if there're sending message for the first time then start to create the new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        // don't need to messages: [] because we already set the default to []
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // SOCKET IO Functionality will go here

    // this will wait longer to save
    // await conversation.save(); 1s
    // await newMessage.save(); wait above command to finish then run

    // This will run in parallel faster than above command
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {}
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // return [{ object, ... , .. }, ... ] message
    // instead of return id {_id: xxx.. } object of message

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
