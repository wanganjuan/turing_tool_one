"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const treeview_1 = require("./treeview");
const path = require("path");
const fs = require("fs");
let panel = undefined;
function activate(context) {
    vscode.window.registerTreeDataProvider('t-view', new treeview_1.TreeViewProvider(context));
    // context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
    // 	vscode.window.setStatusBarMessage('你好，欢迎来到图聆！');
    // 	// vscode.window.showInformationMessage(label);
    //       // 将 context, vscode.ViewColumn.Active, label 传递进去
    //       // vscode.ViewColumn.Active: 表示当前选中的面板
    // 	// const webView = createWebView(context, vscode.ViewColumn.Active, label);
    // 	// context.subscriptions.push(webView);
    // }));
    context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
        panel = vscode.window.createWebviewPanel('webView', label, vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true
        });
        panel.webview.html = getWebViewContent(context, 'media/index.html');
    }));
}
exports.activate = activate;
function getWebViewContent(context, templatePath) {
    const resourcePath = path.join(context.extensionPath, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}
//# sourceMappingURL=extension.js.map