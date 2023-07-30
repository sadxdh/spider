# import json
#
#
# class YzwPipeline:
#     def open_spider(self, spider):
#         self.file = open('results.json', 'w')
#
#     def close_spider(self, spider):
#         self.file.close()
#
#     def process_item(self, item, spider):
#         line = json.dumps(dict(item), ensure_ascii=False) + "\n"
#         self.file.write(line)
#         return item

import csv


class YzwPipeline:
    def open_spider(self, spider):
        self.file = open('results.csv', 'w', encoding='utf-8-sig', newline='')
        self.writer = csv.DictWriter(self.file, fieldnames=['school', 'test', 'college', 'subject', 'style',
                                                            'direction', 'Remarks', 'polite', 'language', 'math',
                                                            'project'])
        self.writer.writeheader()

    def close_spider(self, spider):
        self.file.close()

    def process_item(self, item, spider):
        self.writer.writerow(item)
        return item
