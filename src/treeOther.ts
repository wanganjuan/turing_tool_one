import { TreeDataProvider, Event, TreeItem, TreeItemCollapsibleState, ProviderResult, Uri, Command } from "vscode";
import { join } from 'path';
export class DataProvider implements TreeDataProvider<DataItem> {
    onDidChangeTreeData?: Event<DataItem | null | undefined> | undefined;
    data: DataItem[];

    constructor() {
        this.data = [
            // new DataItem('line1', [new DataItem('line1-sub1', [new DataItem('line1-sub1'), new DataItem('line1-sub2')]), new DataItem('line1-sub2')]),
            // new DataItem('line2', [new DataItem('line2-sub1'), new DataItem('line2-sub2')]),
            new DataItem('工具列表', [new DataItem('模式可视化')])
        ];
    }

    getTreeItem(element: DataItem): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: DataItem | undefined): ProviderResult<DataItem[]> {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}

// 这个每一子集
class DataItem extends TreeItem{
    public children: DataItem[] | undefined;
    // command: 为每项添加点击事件的命令
    constructor( public readonly label: string, children?: DataItem[] | undefined) {
        super(label, children === undefined ? TreeItemCollapsibleState.None : TreeItemCollapsibleState.Collapsed);
        this.children = children;
    }
    iconPath = DataItem.getIconUriForLabel(this.label)
    static getIconUriForLabel(label: string):Uri {
      if (label === '模式可视化') {
        console.log(join(__filename, '', '', 'source', 'tree1.svg'))
        return  Uri.file(
          join(__filename, '..', '..', 'source', 'tree1.svg')
        )
      }
      return Uri.file(
        join(__filename, '..', '..', 'source', 'dep.png')
      )
    }
    static getCommand(label: string):Command {
      if (label === '模式可视化') {
        return {
          title: label,          // 标题
          command: 'turing.tool',       // 命令 ID
          tooltip: label,        // 鼠标覆盖时的小小提示框
          arguments: [                // 向 registerCommand 传递的参数。
              label       // 目前这里我们只传递一个 label
          ]
        }
      }
      return {
        title: '模式可视化',
        command: 'turing.tool'
      }
    }
}