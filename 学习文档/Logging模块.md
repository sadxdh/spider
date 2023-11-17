# Logging module

## 日志等级

logging函数默认定义的5个日志等级

![img](pic/Logging%20module/v2-4143ebb4930d28a10af0cb9f2b2079c2_1440w.webp)

**注**：默认打印的日志等级是 WARNING ，所以实际结果中只打印出了WARNING 或WARNING级别之上的日志。

## 日志字段信与格式

事件发生时间、事件发生位置、事件的严重程度、日志级别、事件内容等其他内容

**注**：输出一条日志时，日志内容和日志级别是需要开发人员明确指定的；对于而其它字段信息，只需要是否显示在日志中就可以了。

## 记录日志的两种方式

### logging提供的模块级别函数

#### 函数描述

![img](pic/Logging%20module/v2-ac19f8a924ecfcf457e0259408534bb6_1440w.webp)

**注**：其中logging.basicConfig(**kwargs)函数用于指定“要记录的日志级别”、“日志格式”、 “日志输出位置”、“日志文件的打开模式”等信息，其他几个都是用于记录各个级别日志的函数。

#### 实例

```python
import logging
def ex_logging():
    logging.debug("日志级别：DEBUG")
        logging.info("日志级别：INFO")
        logging.warning("日志级别：WARNING")
        logging.error("日志级别：ERROR")
        logging.critical("日志级别：CRITICAL")
ex_logging()
```

```reStructuredText
WARNING:root:日志级别：WARNING
ERROR:root:日志级别：ERROR
CRITICAL:root:日志级别：CRITICAL
```

### logging日志系统的四大组件

![img](pic/Logging%20module/v2-506ce8317d3aae61c2017aec5e7c4f20_1440w.webp)

#### 组件之间的关系

（1）日志器（logger）需要通过处理器（handler）将日志信息**输出到目标位置**，**不同的处理器（handler）**可以将日志输出到**不同的位置**。

（2）日志器（logger）可以设置**多个处理器（handler）**将**同一条日志记录**输出到**不同的位置**。

（3）**每个处理器（handler）**都可以设置**自己的过滤器（filter）**实现日志过滤，从而只保留感兴趣的日志。

（4）**每个处理器（handler）**都可以设置**自己的格式器（formatter）**实现**同一条日志**以**不同的格式**输出到**不同的地方**。

**总结以上内容**：Logger 可以包含一个或多个 Handler 和 Filter，即：LoggerFilter，即：**Logger 与 Handler 或 Fitler 是一对多的关系；**一个 Logger 实例可以新增多个 Handler，一个 Handler 可以新增多个格式化器或多个过滤器，而且日志级别将会继承。

#### 日志器-Logger

（1）Logger是一个树形层级结构，在使用接口debug、info、warning、error、critical之前必须创建Logger实例

（2）创建方式

```python
  logger = logging.getLogger(logger_name)
```

（3）创建Logger实例后，可以使用以下方法进行日志级别设置，增加处理器Handler

```python
logger.setLevel(logging.ERROR) # 设置日志级别为 ERROR，即只有日志级别大于等于 ERROR 的日志才会输出
logger.addHandler(handler_name) # 为Logger实例增加一个处理器
logger.removeHandler(handler_name) # 为 Logger 实例删除一个处理器
```

#### 处理器-Handler

（1）Handler处理器类型有很多种，比较常用的有三个：StreamHandler、FileHandler、NullHandler

（2）创建方式

```
# StreamHandler创建方式
sh = logging。StreamHandler(stream=None)
# FileHandler创建方式
# fh = logging.FileHandler(filename,mode='a',encoding=None,delay=False)
# NullHandler:NullHandler类位于核心logging包，不做任何格式化或者输出。本质上它是个“什么都不做”的handler，由库开发者使用。 
```

（3）创建StreamHandler之后，可以通过使用以下方法设置日志级别，设置格式化器Formatter，增加或删除过滤器Filter。

```python
ch.setLevel(logging.WARN) # 指定日志级别，低于WARN级别的日志将被忽略
ch.setFormatter(formatter_name) # 设置一个格式化器formatter
ch.addFilter(filter_name) # 增加一个过滤器，可以增加多个
ch.removeFilter(filter_name) # 删除一个过滤器
```

#### 过滤器-filters

（1）Filter过滤器基类，它只允许某个logger层级下的日志时间通过过滤。

（2）一条日志信息被输出要经过以下几次过滤：日志等级过滤、日志器的过滤器过滤、日志器的处理器等级过滤、日志器的处理器的过滤器过滤。

（3）创建方式

```python
filter = logging.Filter(name:'')
```

#### 格式化器-Formatter

（1）使用Formatter对象设置日志信息最后的规则、结构和内容，默认的时间格式为%Y-%m-%d %H:%M:%S（年月日时分秒）

（2）创建方法

```
formatter = logging.Formatter(fmt=None,datefmt=None)
# fmt是消息的格式化自负床，datefmt是日期字符串。如果不指明fmt，将使用'%(message)s'。如果不指明datefmt，将使用ISO8601日期格式。
```

## 实例代码

### 使用python代码实现日志配置

```python
import logging
import sys
# 创建日志器logger并将其日志级别设置为DEBUG
logger = logging.getLogger("python_config_logger")
logger.setLevel(logging.DEBUG)
# 创建一个流处理器handler并将其日志级别设置为DEBUG
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)
# 创建一个格式化器formatter并将其添加到处理器handler中
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
# 为日志器logger添加上面创建好的处理器handler
logger.addHandler(handler)
# 将日志打印在控制台
logger.debug('打印日志级别：debug')
logger.info('打印日志级别：info')
logger.warning('打印日志级别：warning')
logger.error('打印日志级别：error')
logger.critical('打印日志级别：critical') 

'''
2021-02-24 17:13:44,644 - python_config_logger - DEBUG - 打印日志级别：debug
2021-02-24 17:13:44,644 - python_config_logger - INFO - 打印日志级别：info
2021-02-24 17:13:44,644 - python_config_logger - WARNING - 打印日志级别：warning
2021-02-24 17:13:44,645 - python_config_logger - ERROR - 打印日志级别：error
2021-02-24 17:13:44,645 - python_config_logger - CRITICAL - 打印日志级别：critical
'''
```

### 使用配置文件和fileConfig()函数实现日志配置

```
# logging.conf配置文件
[loggers]
keys=root,simpleExample
# 测试
[handlers]
keys=fileHandler,consoleHandler
[formatters]
keys=simpleFormatter
[logger_root]
level=DEBUG
handlers=fileHandler
[logger_simpleExample]
level=DEBUG
handlers=consoleHandler
qualname=simpleExample
propagate=0
[handler_consoleHandler]
class=StreamHandler
args=(sys.stdout,)
level=DEBUG
formatter=simpleFormatter
[handler_fileHandler]
class=FileHandler
args=('logging.log', 'a')
level=ERROR
formatter=simpleFormatter
[formatter_simpleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=
```
```python
# python代码
import logging.config
# 读取日志配置文件内容
logging.config.fileConfig('logging.conf')
# 创建一个日志器logger
logger = logging.getLogger('simpleExample')
# 将日志打印在控制台
logger.debug('打印日志级别：debug')
logger.info('打印日志级别：info')
logger.warning('打印日志级别：warning')
logger.error('打印日志级别：error')
logger.critical('打印日志级别：critical')

'''
2021-02-25 15:04:50,644 - simpleExample - DEBUG - 打印日志级别：debug
2021-02-25 15:04:50,646 - simpleExample - INFO - 打印日志级别：info
2021-02-25 15:04:50,646 - simpleExample - WARNING - 打印日志级别：warning
2021-02-25 15:04:50,646 - simpleExample - ERROR - 打印日志级别：error
2021-02-25 15:04:50,646 - simpleExample - CRITICAL - 打印日志级别：critical
'''
```

### 使用dict配置信息和dictConfig()函数实现日志配置

```yaml
version: 1
formatters:
  simple:
    format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: simple
loggers:
  simpleExample:
    level: DEBUG
    handlers: [console]
    propagate: no
root:
  level: DEBUG
  handlers: [console]
```

```python
import logging.config
import logging
import yaml

# 读取日志配置文件内容
with open('logging.yml', 'r') as file_logging:
    dict_conf = yaml.load(file_logging, Loader=yaml.FullLoader)
logging.config.dictConfig(dict_conf)
# 创建一个日志器logger
logger = logging.getLogger('simpleExample')
# 将日志打印在控制台
logger.debug('打印日志级别：debug')
logger.info('打印日志级别：info')
logger.warning('打印日志级别：warning')
logger.error('打印日志级别：error')
logger.critical('打印日志级别：critical')  

'''
2021-02-25 15:14:28,822 - simpleExample - DEBUG - 打印日志级别：debug
2021-02-25 15:14:28,822 - simpleExample - INFO - 打印日志级别：info
2021-02-25 15:14:28,822 - simpleExample - WARNING - 打印日志级别：warning
2021-02-25 15:14:28,822 - simpleExample - ERROR - 打印日志级别：error
2021-02-25 15:14:28,823 - simpleExample - CRITICAL - 打印日志级别：critical
'''
```

