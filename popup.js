

document.addEventListener('DOMContentLoaded', function () {

    const speedSlider = document.getElementById('speed');
    const speedValueDisplay = document.getElementById('speedValue');

    // 更新显示的滑动条值
    function updateSpeedValue() {
        updateSpeed(speedSlider.value);
        speedValueDisplay.textContent = speedSlider.value;
    }

    // 监听滑动条的 input 事件
    speedSlider.addEventListener('input', updateSpeedValue);

    // 初始化显示的滑动条值
    updateSpeedValue();
});


function updateSpeed(speed) {
    speed =speed*10;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
        }, () => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'update', speed: speed });
        });
    });
}





