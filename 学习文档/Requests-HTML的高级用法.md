# Requests-HTML的高级用法

## Session()对象：

如果要保持会话状态并在多个请求之间共享Cookie和其他信息，可以使用`Session()`对象：

```python

session = HTMLSession()

r = session.get('https://www.example.com')

# do something

r = session.get('https://www.example.com/another-page')

# do something else

```

上面的代码将在多个请求之间保持会话状态。

## Element.xpath()方法查找元素：

如果要使用XPath表达式来查找元素，可以使用`Element.xpath()`方法：

```python

elements = r.html.xpath('//div[@class="some-class"]')

for e in elements:

    print(e.text)

```

上面的代码将查找所有`class`属性为`some-class`的`<div>`标签的文本内容。

## Element.absolute_links属性获取绝对链接：

如果要获取HTML文档中所有的绝对链接，可以使用`Element.absolute_links`属性：

```python

links = r.html.absolute_links

for link in links:

    print(link)

```

上面的代码将打印HTML文档中所有的绝对链接。

## Element.find_parents()方法查找父元素：

如果要查找元素的父元素，可以使用`Element.find_parents()`方法：

```python

element = r.html.find('.class-name', first=True)

parent = element.find_parents('div', first=True)

print(parent.text)

```

上面的代码将查找`class`属性为`class-name`的元素的第一个父级`<div>`标签的文本内容。

## Element.find_next_siblings()方法查找兄弟元素：

如果要查找元素后面的所有兄弟元素，可以使用`Element.find_next_siblings()`方法：

```python

element = r.html.find('.class-name', first=True)

siblings = element.find_next_siblings()

for sibling in siblings:

    print(sibling.text)

```
