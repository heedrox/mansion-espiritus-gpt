import path from 'path'
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => {
  const isWatchMode = argv.watch;
  
  return {
    mode: 'production',
    entry: './index.js',
    output: {
      filename: isWatchMode ? 'main.js' : 'main.[contenthash].js',
      path: path.resolve(__dirname, 'web'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './web/index.template.html',
        filename: 'index.html'
      })
    ],
    stats: true
  };
};