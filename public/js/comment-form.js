// static/js/comment-form.js - Final Corrected Version

// [核心修正] 从 './firebaseio.js' 导入我们需要的 database 和 serverTimestamp
import { database, serverTimestamp } from './firebaseio.js';

// [核心修正] 将所有需要的 Firebase 数据库函数一次性在顶部导入
import { ref, push, query, orderByChild, equalTo, onValue } from 'firebase/database';

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentMessage = document.getElementById('comment-message');
    const commentsList = document.getElementById('comments-list');

    // 处理评论提交的逻辑
    if (commentForm) {
        // 将提交事件的监听器标记为 async，因为内部有异步操作 (push)
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            commentMessage.textContent = '提交中...';
            commentMessage.className = 'comment-message info';

            const formData = new FormData(commentForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            if (!data.name || data.name.trim() === '') {
                data.name = '匿名用户';
            }
            if (!data.content || data.content.trim() === '') {
                commentMessage.textContent = '评论内容不能为空。';
                commentMessage.className = 'comment-message error';
                return;
            }

            const commentData = {
                name: data.name,
                email: data.email || '',
                content: data.content,
                pageId: data.page_id,
                pageTitle: data.page_title,
                timestamp: serverTimestamp(),
                status: 'pending',
            };

            try {
                // [核心修正] 直接使用已在顶部导入的 push 和 ref 函数，移除 await import
                await push(ref(database, 'comments/pending'), commentData);

                commentMessage.textContent = '评论提交成功！等待审核。';
                commentMessage.className = 'comment-message success';
                commentForm.reset();
            } catch (error) {
                console.error('Error submitting comment:', error);
                commentMessage.textContent = '提交评论失败：' + error.message;
                commentMessage.className = 'comment-message error';
            }
        });
    }

    // 处理加载和显示评论的逻辑
    if (commentsList) {
        const currentPagePermalink = document.querySelector('input[name="page_id"]').value;
        commentsList.innerHTML = '<p>加载评论中...</p>';

        // [核心修正] 直接使用已在顶部导入的函数，移除 await import
        const commentsQuery = query(ref(database, 'comments/approved'), orderByChild('pageId'), equalTo(currentPagePermalink));

        onValue(commentsQuery, (snapshot) => {
            commentsList.innerHTML = '';
            const commentsObject = snapshot.val();

            if (commentsObject) {
                const commentsArray = Object.keys(commentsObject).map(key => ({
                    id: key,
                    ...commentsObject[key]
                })).sort((a, b) => b.timestamp - a.timestamp); // 按时间倒序排序

                commentsArray.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment-item';
                    const commentDate = new Date(comment.timestamp).toLocaleString();
                    commentDiv.innerHTML = `
                        <div class="comment-header">
                            <span class="comment-author">${comment.name || '匿名用户'}</span>
                            <span class="comment-date">${commentDate}</span>
                        </div>
                        <p class="comment-content">${comment.content}</p>
                    `;
                    commentsList.appendChild(commentDiv);
                });
            } else {
                commentsList.innerHTML = '<p>暂无评论。</p>';
            }
        }, (error) => {
            console.error('Failed to load comments:', error);
            commentsList.innerHTML = '<p>评论加载失败。</p>';
        });
    }
});
