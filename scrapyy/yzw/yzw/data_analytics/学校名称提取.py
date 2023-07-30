import csv
import pandas as pd

file_path = 'D:\\BaiduSyncdisk\\爬虫\\scrapyy\\yzw\\results.csv'


def query_data(key, value):
    with open(file_path, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file)
        matched_data = []
        for row in reader:
            if value in row[key]:
                matched_data.append(row)
        # print(matched_data)
    return matched_data


def save(value,data):
    df = pd.DataFrame(data)
    df.to_csv(f'{value}.csv', encoding='utf-8-sig')
    unique_schools = df['school'].unique()
    print(unique_schools)


if __name__ == '__main__':
    while True:
        key = input("请输入要查询的key：")
        value = input("请输入要查询的value：")
        results = query_data(key, value)
        if results:
            save(value, results)
            for result in results:
                print(result)
        else:
            print("未找到匹配的数据。")
