import * as vscode from 'vscode';
import { TreeViewProvider } from './treeview';
import { createWebView } from './viewframe'
import { DataProvider } from './treeOther'
export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('t-view',new TreeViewProvider(context));
	context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
		vscode.window.setStatusBarMessage('你好，欢迎来到图聆！');
		// vscode.window.showInformationMessage(label);
        // 将 context, vscode.ViewColumn.Active, label 传递进去
        // vscode.ViewColumn.Active: 表示当前选中的面板
		const webView = createWebView(context, vscode.ViewColumn.Active, label);
		context.subscriptions.push(webView);
	}));
}
