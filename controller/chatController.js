const Conversation = require("../modules/conversations.js")
const {User} = require("../modules/user.js")
const Message = require("../modules/messages.js")


//get or create funktion
async function getOrCreate(req, res) {
  
  try{

    const reciverId = req.params.id
    const senderId = req.user._id

    if(senderId == reciverId){
      return res.status(400).json({message: "Oziniz benen oziniz chat jarata almaysiz aquday"})
    }

    let conversation = await Conversation.findOne({members: {$all: [senderId, reciverId]}})

    if(!conversation){
      conversation = new Conversation({members: [senderId, reciverId]})
      await conversation.save()
    }
    
    res.status(200).json({conversation})

  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}


//get all conversations
async function getAll(req, res){

  try{

    const currentId = req.user._id

    const conversations = await Conversation.find({members: currentId})

    if(conversations.length === 0){
      return res.status(400).json({message: "Hesh kim menen sawbet bolmagan"})
    }

    res.status(200).json({conversations})


  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

///getFriend

async function getFriend(req, res){

  try{

    const friendId = req.params.id

    if(!friendId){
      return res.status(400).json({message: "Bunday id li paydalaniwshi joq"})
    }

    const friend = await User.findById(friendId).select("-password")

    if(!friend){
      return res.status(400).json({message: "Bunday id li paydalaniwshi joq"})
    }

    res.status(200).json({friend})


  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

//giving Messages
async function givingMessages(req, res){

  try{

    const conversationId = req.params.id

    const messages = await Message.find({conversationId: conversationId})

    res.json({messages})

  }
  catch(err){
    return res.status(500).json({message: err.message})
  }

}

//delete
async function deleteConversation(req, res){

  try{
    
    const conversationId = req.params.id

    
    if(!conversationId){
      return res.status(400).json({message: "Bunday chat tawilmadi"})
    }

    const conversation = await Conversation.findById(conversationId);

    if(!conversation){
      return res.status(400).json({message: "Chat tawilmadi"})
    }

    await Conversation.findByIdAndDelete(conversationId)

    res.status(200).json({message: "Oshirildi"})
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}

//clearMessages

async function clearMessages(req, res) {

  try{

    const conversationId = req.params.id

    if(!conversationId){
      return res.status(400).json({message: "Chat tawlmadi"})
    }

    const messages = await Message.find({conversationId})

    if(!messages){
      return res.status(400).json({message: "Xabarlar tawilmadi"})
    }

    await Message.deleteMany({conversationId})

    res.status(200).json({message: "Tazalandi"})
  }
  catch(err){
    return res.status(500).json({message: err.message})
  }
}

module.exports = {getOrCreate, getAll, getFriend, givingMessages, deleteConversation, clearMessages}