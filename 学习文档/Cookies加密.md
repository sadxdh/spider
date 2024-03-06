# Cookies加密

cookiesJar对象转字典

- cookies.get
- requests.utils.dict_from_cookie
- response.cookies.get_dict

## 动态生成cookie

每次访问都会生成新cookie（必须逆向）

## 时效性cookie

一定时间内有效

## 需要登录网站

服务器返回cookie中有特殊字段加密

## 接口请求对象中



## 静态Cookies

网站返回的页面静态数据，requests请求，请求之后返回一段js代码，js环境没有启动

- 第一次请求不携带cookie获取一段js代码
- 获取js代码生成cookie传入第二次请求，请求成功

## 动态Cookies

