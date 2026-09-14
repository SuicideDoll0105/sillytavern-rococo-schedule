const APP_URL = 'https://ais-pre-mleofkg7aqlmeqdef3nnxm-749932924074.us-east1.run.app?st_embedded=1';

jQuery(async () => {
    // 监听并接收日程发送到输入框
    window.addEventListener('message', (event) => {
        if (event.data && (event.data.type === 'SET_USER_INPUT' || event.data.type === 'SEND_TO_USER_INPUT')) {
            const text = event.data.text || event.data.payload || '';
            const textarea = document.getElementById('send_textarea') || document.querySelector('#chat_form textarea');
            if (textarea) {
                textarea.value = text;
                textarea.dispatchEvent(new Event('input', { bubbles: true }));
                textarea.dispatchEvent(new Event('change', { bubbles: true }));
                textarea.focus();
            }
        }
    });

    // 在酒馆扩展栏添加按钮
    const btnHtml = `
        <div id="st_rococo_btn" class="list-group-item flex-container flexGap5 interactable" style="cursor:pointer;" title="打开法式洛可可日程">
            <i class="fa-solid fa-calendar-days"></i>
            <span>24h 法式日程</span>
        </div>
    `;
    $('#extensions_settings').append(btnHtml);

    // 点击打开悬浮小部件
    $('#st_rococo_btn').on('click', () => {
        let box = $('#st_rococo_box');
        if (box.length === 0) {
            $('body').append(`
                <div id="st_rococo_box" style="position:fixed;bottom:20px;right:20px;z-index:99999;width:430px;height:86vh;box-shadow:0 12px 36px rgba(0,0,0,0.4);border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,0.15);">
                    <iframe src="${APP_URL}" style="width:100%;height:100%;border:none;"></iframe>
                </div>
            `);
        } else {
            box.toggle();
        }
    });
});
