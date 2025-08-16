// functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// 初始化 Firebase Admin SDK
admin.initializeApp();

// 定义一个关键词黑名单
// 您可以根据需要添加更多不想看到的词语
const BANNED_WORDS = ["广告", "博彩", "色情", "链接", "http", "www."];

// 创建一个云函数，当 /comments/pending/{commentId} 路径下有新数据创建时触发
exports.moderateComment = functions.database.ref(
  "/comments/pending/{commentId}",
).onCreate(async (snapshot, context) => {
  const comment = snapshot.val();
  const commentId = context.params.commentId;

  // 如果评论数据不存在，则退出
  if (!comment) {
    functions.logger.log("Comment data is null, exiting.");
    return null;
  }

  functions.logger.log(`Auditing comment ${commentId}:`, comment.content);

  // 检查评论内容或用户名是否包含黑名单词汇
  let isSuspicious = false;
  for (const word of BANNED_WORDS) {
    if (
      comment.content.toLowerCase().includes(word) ||
      (comment.name && comment.name.toLowerCase().includes(word))
    ) {
      isSuspicious = true;
      functions.logger.log(
        `Comment flagged for containing banned word: "${word}"`,
      );
      break; // 找到一个就不再继续检查
    }
  }

  // 如果是可疑评论，将其从 pending 中删除（或移动到 rejected）
  if (isSuspicious) {
    functions.logger.log("Comment is suspicious. Deleting from pending.");
    return snapshot.ref.remove();

    // 或者，如果您想保留记录，可以移动到 "rejected" 路径
    // const rejectedRef = admin.database().ref(
    //   `/comments/rejected/${commentId}`,
    // );
    // await rejectedRef.set(comment);
    // return snapshot.ref.remove();
  } else {
    // 如果评论干净，将其移动到 "approved" 路径
    functions.logger.log("Comment seems clean. Moving to approved.");
    const approvedRef = admin.database().ref(
      `/comments/approved/${commentId}`,
    );

    // 可以在这里添加一个字段，标记为自动审核通过
    comment.moderation = {
      status: "auto-approved",
      moderatedAt: admin.database.ServerValue.TIMESTAMP,
    };

    await approvedRef.set(comment);
    return snapshot.ref.remove(); // 从 pending 中删除
  }
});
