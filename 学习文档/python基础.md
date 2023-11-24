# python

## 字典

### 遍历

在Python中，遍历字典可以通过多种方式完成，其中最常用的是使用`for`循环来遍历字典的键（keys）或键值对（key-value pairs）。

#### 遍历键值对（key-value pairs）

使用`.items()`方法可以同时获取键和对应的值：

```python
pythonCopy codemy_dict = {'a': 1, 'b': 2, 'c': 3}

# 遍历键值对
for key, value in my_dict.items():
    print(f"Key: {key}, Value: {value}")
```

#### 遍历键（keys）

如果你只需要遍历字典的键，可以使用`.keys()`方法：

```python
pythonCopy codemy_dict = {'a': 1, 'b': 2, 'c': 3}

# 遍历键
for key in my_dict.keys():
    print(f"Key: {key}")
```

#### 遍历值（values）

如果你只需要遍历字典的值，可以使用`.values()`方法：

```python
pythonCopy codemy_dict = {'a': 1, 'b': 2, 'c': 3}

# 遍历值
for value in my_dict.values():
    print(f"Value: {value}")
```

选择适合你需求的遍历方法来操作字典的键、值或键值对。

### 替换

跟据一个字典B替换另一个字典mydict中的键，可以使用以下方法：

假设有这样的两个字典：

```python
pythonCopy codemydict = {'name': 'Alice', 'age': 25, 'city': 'New York'}
replacement_dict = {'name': 'fullname', 'age': 'years'}
```

现在想要根据`replacement_dict`中的键值对来替换`mydict`中的键，你可以这样做：

```python
pythonCopy codemydict = {'name': 'Alice', 'age': 25, 'city': 'New York'}
replacement_dict = {'name': 'fullname', 'age': 'years'}

# 创建一个新字典，根据 replacement_dict 替换键
new_dict = {replacement_dict.get(k, k): v for k, v in mydict.items()}

print(new_dict)
```

这个方法会根据`replacement_dict`来创建一个新的字典`new_dict`，其中的键会根据`replacement_dict`中的映射进行替换。在这个例子中，'name'被替换成了'fullname'，'age'被替换成了'years'。

这段代码运行后`new_dict`的结果将是：

```python
pythonCopy code
{'fullname': 'Alice', 'years': 25, 'city': 'New York'}
```

## 函数

### lambda

Lambda 函数的语法看起来完全正确。它接受一个参数 `month`，并根据条件返回相应的字符串。

```python
month = 9
month1 = lambda month: f"0{month}" if month < 10 else str(month)
month_str = month1(month)
print(month_str) # "09"
```

这个 lambda 函数会将传入的整数月份转换为字符串格式。如果月份小于 10，它会返回一个带有前导零的字符串形式的月份（比如把 9 转换为 '09'），否则直接返回整数月份对应的字符串形式。