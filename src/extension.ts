import * as vscode from 'vscode';
import { TreeViewProvider } from './treeview';
import { createWebView } from './viewframe'
import { DataProvider } from './treeOther'
import * as path from 'path'
import * as fs from 'fs'
let panel: vscode.WebviewPanel | undefined = undefined;
export function activate(context: vscode.ExtensionContext) {
	vscode.window.registerTreeDataProvider('t-view',new TreeViewProvider(context));
	// context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
	// 	vscode.window.setStatusBarMessage('你好，欢迎来到图聆！');
	// 	// vscode.window.showInformationMessage(label);
  //       // 将 context, vscode.ViewColumn.Active, label 传递进去
  //       // vscode.ViewColumn.Active: 表示当前选中的面板
	// 	// const webView = createWebView(context, vscode.ViewColumn.Active, label);
	// 	// context.subscriptions.push(webView);
	// }));
	context.subscriptions.push(vscode.commands.registerCommand('turing.tool', (label) => {
		panel = vscode.window.createWebviewPanel(
			'webView',
			label,
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);
		panel.webview.html = getWebViewContent(context, 'media/index.html');
	}))
}
function getWebViewContent(context: vscode.ExtensionContext, templatePath: string) {
	const resourcePath = path.join(context.extensionPath, templatePath);
	const dirPath = path.dirname(resourcePath);
	let html = fs.readFileSync(resourcePath, 'utf-8');
	// vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
	html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
			return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	});
	return html;
}
