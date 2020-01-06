"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ['模型可视化', 'tree1.svg']
    // ['pig2', 'pig2.svg'],
    // ['pig3', 'pig3.svg']
]);
// 第一步：创建单项的节点(item)的类
class TreeItemNode extends vscode_1.TreeItem {
    constructor(
    // readonly 只可读
    label, collapsibleState, context) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.context = context;
        // command: 为每项添加点击事件的命令
        this.command = {
            title: this.label,
            command: 'turing.tool',
            tooltip: this.label,
            arguments: [
                this.label // 目前这里我们只传递一个 label
            ]
        };
        // iconPath： 为该项的图标因为我们是通过上面的 Map 获取的，所以我额外写了一个方法，放在下面
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label, this.context);
        this.context = context;
    }
    // __filename：当前文件的路径
    // 重点讲解 Uri.file(join(__filename,'..', '..') 算是一种固定写法 : out文件得原因
    // Uri.file(join(__filename,'..','assert', ITEM_ICON_MAP.get(label)+''));   写成这样图标出不来
    // 所以小伙伴们就以下面这种写法编写
    static getIconUriForLabel(label, context) {
        console.log(555, context);
        return vscode_1.Uri.file(path_1.join(context.extensionPath, 'source', ITEM_ICON_MAP.get(label) + ''));
        console.log(context, path_1.join(context.extensionPath, 'src', 'tview', 'assert', ITEM_ICON_MAP.get(label) + ''));
        // return Uri.file(join(__filename,'..', '..', '..', 'src', 'tview','assert', ITEM_ICON_MAP.get(label)+''));
    }
}
exports.TreeItemNode = TreeItemNode;
class TreeViewProvider {
    constructor(context) {
        this.context = context;
    }
    // 自动弹出
    // 获取树视图中的每一项 item,所以要返回 element
    getTreeItem(element) {
        return element;
    }
    // 自动弹出，但是我们要对内容做修改
    // 给每一项都创建一个 TreeItemNode
    getChildren(element) {
        return ['模型可视化'].map(item => {
            console.log(this.context);
            return new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None, this.context);
        });
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=treeview.js.map