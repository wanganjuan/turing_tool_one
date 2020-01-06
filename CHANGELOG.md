# Changelog
记录主要版本记录

## [Unreleased]
## [0.1.3] - 2020-01-06
- 集成弹出话术，采用
const vscode = acquireVsCodeApi();
vscode.postMessage({
  command: 'alert',
  text: '🐛  on line '
})
panel.webview.onDidReceiveMessage(
  message => {
    switch (message.command) {
      case 'alertE':
        vscode.window.showErrorMessage(message.text);
        return;
      case 'alertI':
        vscode.window.showInformationMessage(message.text);
        return;
    }
  },
  undefined,
  context.subscriptions
);
## [0.1.0] - 2020-01-06
### modify
- 不采用实现iframe 
- netron 资源直接集成vscode

## [0.0.5] - 2020-01-05
### Added
- 实现iframe 集成vscode

## [0.0.1] - 2020-01-05
### Added
- 初版，基础框架