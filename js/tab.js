const tab1 = document.getElementById('tab1')

setTab(tab1)


function setTab(tab) {
    let list = tab.children[0].children
    let lineGray = tab.children[1]//灰色线
    let line = tab.children[1].children[0]//蓝色线
    let slected = 0//选中项索引
    let totalMove = 0//整体偏移
    let lineMove = 0//蓝色线水平偏移

    lineGray.style.width = Math.max(tab.children[0].scrollWidth, tab.offsetWidth)//把灰线宽度=tab总宽
    line.style.width = list[slected].offsetWidth
    line.style.transform = `translateX(${lineMove}px)`
    lineGray.style.transform = `translateX(${lineMove}px)`

    for (i = 0; i < list.length; i++) {
        list[i].index = i
        list[i].onclick = setSlecte
    }

    function setSlecte() {
        list[slected].classList.remove('tab-selected')
        this.classList.add('tab-selected')
        let diretion = (this.index > slected) ? 'right-in' : 'left-in'
        let span = Math.abs(this.index - slected)//tab切换的跨度
        slected = this.index
        line.style.width = this.offsetWidth//根据tab文字宽度计算蓝线宽度
        lineMove = 0

        for (i = 0; i < slected; i++) {
            lineMove += (list[i].offsetWidth + 20)//累加每个tab的宽度和间距，计算蓝线偏移量
        }
        //如果tab数量显示不完才执行
        if (tab.children[0].scrollWidth > tab.children[0].offsetWidth) {
            let rGap = (lineMove + parseInt(line.style.width)) - (tab.children[0].offsetWidth + totalMove)
            let lGap = lineMove - totalMove

            //如果蓝线超出显示范围，则移动整体，使蓝线全部显示，并且留出另一侧50px的空间
            if (rGap >= -80) {
                totalMove = Math.min(totalMove + rGap + 80, tab.children[0].scrollWidth - tab.children[0].offsetWidth)
            } else if (lGap <= 80) {
                totalMove = Math.max(totalMove - (80 - lGap), 0)
            }

            console.log(lineMove, totalMove)
            tab.children[0].style.transform = `translateX(-${totalMove}px)`
            lineGray.style.transform = `translateX(-${totalMove}px)`
        } else {
            totalMove = 0
        }

        line.style.transform = `translateX(${lineMove}px)`
        line.style.transitionDuration = `${Math.max(0.3 + 0.03 * (span))}s`//蓝色线移动时间随距离变化

        rankList.add(rankId[slected], diretion);//重新加载应用数据

    }
}

