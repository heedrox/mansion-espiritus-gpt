import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'web'),
  },
  stats: true
};