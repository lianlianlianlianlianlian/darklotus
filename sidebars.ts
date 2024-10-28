import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 使用自动生成的侧边栏
  sidebar: [
    {
      type: 'autogenerated',
      dirName: '.', // 自动生成根目录下的所有文档
    },
  ],
};

export default sidebars;

