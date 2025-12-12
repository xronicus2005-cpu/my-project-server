const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },

    unreadCount: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema)

module.exports = Conversation