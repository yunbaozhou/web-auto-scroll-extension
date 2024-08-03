// 主要修改点：
// 使用 requestAnimationFrame：取代 setInterval 实现更平滑的滚动效果。
// 动画控制：使用 requestAnimationFrame 实现平滑的滚动动画，并调整滚动速度以适应不同浏览器的性能差异。
// 这样做可以确保滚动效果在不同浏览器中的一致性，减少性能差异带来的问题。



// 确保 scrollAnimationFrame 在全局范围内只声明一次
if (typeof scrollAnimationFrame === 'undefined') {
    var scrollAnimationFrame;
}
if (typeof speed === 'undefined') {
    var speed = 1;
}

function startScrolling() {
    const scrollableElements = getScrollableElements();
    let accumulatedScroll = 0; // 累积滚动的距离

    function scrollStep() {
        scrollableElements.forEach(element => {
            // 累积滚动距离
            accumulatedScroll += speed / 40;

            // 如果累积的距离大于等于1像素，则执行滚动
            if (accumulatedScroll > 1) {
                const pixelsToScroll = Math.floor(accumulatedScroll); // 计算实际需要滚动的像素数
                element.scrollBy(0, pixelsToScroll);
                accumulatedScroll -= pixelsToScroll; // 从累积量中减去已经滚动的距离
            }
        });

        // 确保动画的连续性和平滑性
        scrollAnimationFrame = requestAnimationFrame(scrollStep);
    }

    scrollStep(); // 启动滚动动画


    // const scrollableElements = getScrollableElements();
    // function scrollStep() {
    //     scrollableElements.forEach(element => {
    //         element.scrollBy(0, speed/50 ); // 调整速度以适应requestAnimationFrame的帧率
    //     });
    //     scrollAnimationFrame = requestAnimationFrame(scrollStep);
    // }
    // scrollStep();
}

function stopScrolling() {
    if (scrollAnimationFrame) {
        cancelAnimationFrame(scrollAnimationFrame);
    }
}

function getScrollableElements() {
    const elements = [];
    document.querySelectorAll('*').forEach(element => {
        if (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth) {
            elements.push(element);
        }
    });
    return elements;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        stopScrolling();
        speed = parseInt(request.speed);
        startScrolling();
    } else if (request.action === 'stop') {
        stopScrolling();
    } else if (request.action === 'update') {
        stopScrolling();
        speed = parseInt(request.speed);
        startScrolling();
    } else if (request.action === 'increase') {
        stopScrolling();
        startScrolling();
    } else if (request.action === 'decrease') {
        speed = Math.max(10, speed);
        stopScrolling();
        startScrolling();
    }
});

