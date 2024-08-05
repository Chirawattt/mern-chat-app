import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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

    // this will wait longer to save
    // await conversation.save(); 1s
    // await newMessage.save(); wait above command to finish then run

    // This will run in parallel faster than above command
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO Functionality will go here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit(<event_name>, <data>) used to send the event to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
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
