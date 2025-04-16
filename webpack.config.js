const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// 基本配置
const baseConfig = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    'element-ui': {
      commonjs: 'element-ui',
      commonjs2: 'element-ui',
      amd: 'element-ui',
      root: 'ElementUI'
    }
  },
  optimization: {
    minimize: false
  }
};

// UMD 配置
const umdConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'v-tooltip-plus.umd.js',
    library: 'VTooltipPlus',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  }
};

// UMD 压缩版本
const umdMinConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'v-tooltip-plus.umd.min.js',
    library: 'VTooltipPlus',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: {
        format: {
          comments: false
        }
      }
    })]
  }
};

// CommonJS 配置
const commonjsConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'v-tooltip-plus.common.js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  }
};

// ES Module 配置 - 改为使用普通的方式输出，放弃experiments模式
const esmConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'v-tooltip-plus.esm.js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  optimization: {
    // 禁用代码拆分和优化，避免处理错误
    concatenateModules: false,
    usedExports: false
  }
};

// 为每个格式单独导出配置，避免同时构建可能导致的问题
const configs = {
  umd: umdConfig,
  umdMin: umdMinConfig,
  commonjs: commonjsConfig
};

// 根据命令行参数选择要构建的格式
const target = process.env.TARGET || 'all';
let exportedConfigs;

if (target === 'all') {
  exportedConfigs = [umdConfig, umdMinConfig, commonjsConfig];
} else if (configs[target]) {
  exportedConfigs = [configs[target]];
} else {
  console.error(`Invalid target: ${target}`);
  process.exit(1);
}

module.exports = exportedConfigs; 