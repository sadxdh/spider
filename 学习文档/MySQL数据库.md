

# MySQL数据库

## 一、MySQL通配符模糊查询(%,_)

### 1-1. 通配符的分类

1、"%" 百分号通配符: 表示任何字符出现任意次数 (可以是0次)。

2、"_" 下划线通配符:表示只能匹配单个字符,不能多也不能少,就是一个字符。当然，也可以like "陈"，数量不限。

3、like操作符:LIKE作用是指示mysql后面的搜索模式是利用通配符而不是直接相等匹配进行比较；但如果like后面没出现通配符，则在SQL执行优化时将 like 默认为 “=”执行

> 注意: 如果在使用like操作符时，后面没有使用通用匹配符（%或_），那么效果是和“=”一致的。在SQL执行优化时查询优化器将 like 默认为 “=”执行,SELECT * FROM movies WHERE movie_name like '唐伯虎';只能匹配movie_name=“唐伯虎”的结果,而不能匹配像“唐伯虎点秋香”或“唐伯虎点香烟”这样的结果.

### 1-2. 通配符的使用

#### 1) % 通配符

```sql
-- 模糊匹配 含有“网”字 的数据
SELECT * from app_info where appName like '%网%'; 
-- 模糊匹配 以“网”字结尾 的数据
SELECT * from app_info where appName like '%网'; 
-- 模糊匹配 以“网”字开头 的数据
SELECT * from app_info where appName like '网%'; 
-- 精准匹配，appName like '网' 等同于：appName = '网'
SELECT * from app_info where appName = '网'; 
SELECT * from app_info where appName like '网'; 
-- 模糊匹配含有“xxx网xxx车xxx”的数据,如："途途网约车司机端、网络约车平台"
SELECT * from app_info where appName like '%网%车%';
```

#### 2) _ 通配符

```sql
-- 查询以“网”为结尾的，长度为三个字的数据，如："链家网"   --注意：'%__网、__%网'  等同于 '%网'
SELECT * from app_info where appName like '__网';
-- 查询前三个字符为XX网，后面任意匹配，如："城通网盘、模具网平台"
SELECT * from app_info where appName like '__网%';
-- 模糊匹配含有“xx网x车xxx”的数据，如："携程网约车客户端"
SELECT * from app_info where appName like '__网_车%';
```

> 注意事项:   
>
> 1、注意大小写,在使用模糊匹配时,也就是匹配文本时,**MySQL默认配置是不区分大小写的**。当你使用别人的MySQL数据库时，要**注意是否区分大小写**，是否区分大小写<u>取决于用户对MySQL的配置方式</u>.如果是区分大小写,那么像Test12这样记录是不能被"test__"这样的匹配条件匹配的。
>
> 2、注意**尾部空格**,"%test"是不能匹配"test "这样的记录的。
>
> 3、注意NULL,%通配符可以匹配任意字符,但是**不能匹配NULL**,也就是说SELECT * FROM blog where title_name like '%';是匹配不到title_name为NULL的的记录。

### 1-3. 技巧与建议:

正如所见，MySQL的通配符很有用。但这种功能是有代价的：通配符搜索的处理一般要比前面讨论的其他搜索所花时间更长，消耗更多的内存等资源。这里给出一些使用通配符要记住的技巧。

- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。
- 在确实需要使用通配符时，除非绝对有必要，否则不要把它们用在搜索模式的开始处。因为MySQL在where后面的执行顺序是从左往右执行的，如果把通配符置于搜索模式的开始处（最左侧），搜索起来是最慢的(因为要对全库进行扫描)。
- 仔细注意通配符的位置。如果放错地方，可能不会返回想要的数据。

有细心地朋友会发现，如果数据中有“%”、“_”等符号，那岂不是和通配符冲突了？

```sql
SELECT * from app_info where appName LIKE '%%%';
SELECT * from app_info where appName LIKE '%_%';
```

确实如此，上面面两条SQL语句查询的都是全表数据，而不是带有"%"和"_"的指定数据。**这里需要加 ESCAPE 关键字进行转义**。

如下，ESCAPE 后面跟着一个字符，里面写着什么，MySQL就把那个符号当做转义符，一般我就写成"/"；然后就像 C语言中转义字符一样 例如 ‘\n’,’\t’, 把这个字符写在你需要转义的那个%号前就可以了；

```sql
SELECT * from app_info where appName LIKE '%/_%' ESCAPE '/'; 
```


但是这种情况有没有更高端点的解决办法呢？能让检查你代码的同事或领导对你刮目相看那种~~

当然，下面我们就来看看MySQL的第二类模糊匹配方式 --- 内置函数查询


















原文链接：https://blog.csdn.net/qq_39390545/article/details/106414765