"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const treeview_1 = require("./treeview");
const viewframe_1 = require("./viewframe");
function activate(context) {
    vscode.window.registerTreeDataProvider('t-view', new treeview_1.TreeViewProvider(context));
    context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
        // vscode.window.showInformationMessage(label);
        // 将 context, vscode.ViewColumn.Active, label 传递进去
        // vscode.ViewColumn.Active: 表示当前选中的面板
        const webView = viewframe_1.createWebView(context, vscode.ViewColumn.Active, label);
        context.subscriptions.push(webView);
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map