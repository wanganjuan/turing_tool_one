import * as vscode from 'vscode';
import { TreeViewProvider } from './tview/treeview';
import { createWebView } from './tview/viewframe'
export function activate(context: vscode.ExtensionContext) {
	TreeViewProvider.initTreeViewItem();
	context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
		// vscode.window.showInformationMessage(label);
        // 将 context, vscode.ViewColumn.Active, label 传递进去
        // vscode.ViewColumn.Active: 表示当前选中的面板
		const webView = createWebView(context, vscode.ViewColumn.Active, label);
		context.subscriptions.push(webView);
	}));
 
}
