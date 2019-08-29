import { routerList } from '@/files/js/routerList'



//传入用户角色判断能否进入哪个路由

export function toRouter(roles) {
    let addRouter = [];
    for (let item of routerList) {
        for (let items of item.meta.roles) {
            if (items == roles) {
                addRouter.push(item)
            }
        }
    }
    return addRouter
}

export function toMenu(data) {
    // console.log(data)
    let addMenu = [];
    for (let item of data) {
        // console.log(item)
        //有子目录
        if (item.children && item.children.length > 0) {
            let addChildren = [];
            for (let items of item.children) {
                if (items.children && items.children.length > 0) {
                    let addGrandChildren = [];
                    for (let grandChild of items.children) {
                        addGrandChildren.push({
                            title: grandChild.meta.title,
                            name: grandChild.name
                        })
                    }
                    addChildren.push({
                        title: items.meta.title,
                        name: items.name,
                        children: addGrandChildren
                    })
                } else {
                    addChildren.push({
                        title: items.meta.title,
                        name: items.name,

                    })
                }
            }
            addMenu.push({
                    title: item.meta.title,
                    name: item.name,
                    icon: item.meta.icon,
                    children: addChildren,
                })
                // console.log(addMenu)
        } else { //没有子目录
            addMenu.push({
                title: item.meta.title,
                name: item.name,
                icon: item.meta.icon,
            })
        }
    }
    return addMenu
}
