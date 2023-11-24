# PandasNumpy数据处理

## 插入列

## 生成时间序列

```python
def datelist(beginDate, endDate):
    # beginDate, endDate是形如‘20160601’的字符串或datetime格式
    date_l = [datetime.datetime.strftime(x, '%Y/%m%d') for x in list(pd.date_range(start=beginDate, end=endDate))]
    return date_l
```

