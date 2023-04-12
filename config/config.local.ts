// 开发环境配置
export default () => ({
  mysql: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'bookstore',
    synchronize: false,
  },
});
