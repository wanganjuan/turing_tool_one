"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
class DataProvider {
    constructor() {
        this.data = [
            // new DataItem('line1', [new DataItem('line1-sub1', [new DataItem('line1-sub1'), new DataItem('line1-sub2')]), new DataItem('line1-sub2')]),
            // new DataItem('line2', [new DataItem('line2-sub1'), new DataItem('line2-sub2')]),
            new DataItem('工具列表', [new DataItem('模式可视化')])
        ];
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
exports.DataProvider = DataProvider;
// 这个每一子集
class DataItem extends vscode_1.TreeItem {
    // command: 为每项添加点击事件的命令
    constructor(label, children) {
        super(label, children === undefined ? vscode_1.TreeItemCollapsibleState.None : vscode_1.TreeItemCollapsibleState.Collapsed);
        this.label = label;
        this.iconPath = DataItem.getIconUriForLabel(this.label);
        this.children = children;
    }
    static getIconUriForLabel(label) {
        if (label === '模式可视化') {
            console.log(path_1.join(__filename, '', '', 'source', 'tree1.svg'));
            return vscode_1.Uri.file(path_1.join(__filename, '..', '..', 'source', 'tree1.svg'));
        }
        return vscode_1.Uri.file(path_1.join(__filename, '..', '..', 'source', 'dep.png'));
    }
    static getCommand(label) {
        if (label === '模式可视化') {
            return {
                title: label,
                command: 'turing.tool',
                tooltip: label,
                arguments: [
                    label // 目前这里我们只传递一个 label
                ]
            };
        }
        return {
            title: '模式可视化',
            command: 'turing.tool'
        };
    }
}
//# sourceMappingURL=treeOther.js.map