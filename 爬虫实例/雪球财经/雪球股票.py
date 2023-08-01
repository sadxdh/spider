import requests
import csv

# 请求头
headers = {
    'Cookie': 's=ax11piftq6; xq_a_token=715ae77c7b72c67549b80e153e894ef2e19f0446; xq_r_token=a1c71f74d5f0fd50f87640a0682c837e5a07f706; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTY5MjkyMzcyMSwiY3RtIjoxNjkwNjMxMTM5MDQ4LCJjaWQiOiJkOWQwbjRBWnVwIn0.MJ_AKpk9mSGhK9qH7xsVZInz0ahw4g3_h-bxEXkhRm-anH16Jrpz6Cd77zF-pbW2u7V8UAl-scE3vQhtFf2xtkqHdp4j244RXo8rzIDRwQm90joq1aJG8-pthsrjdWKDQoHH2uyw4srabWRMm-PE9dx2ogkq86943kD7CkSaY7rzsvGot4SFDaFjRLDdp5GkShdjg7qM9EveyIJkm60FDZf6yfCCh0qgSaT97wCywJ32RAUEN5noAnGw88gfdMXjshDg-yzdr9irLK4ybzxjG55JMHQnINlX0xoQLd3yuMo_2EEx8dH4k_uIMJAIHS_8_-R6Ef110xg9ig6DFjOQ2w; Hm_lvt_1db88642e346389874251b5a1eded6e3=1690631181; u=751690631181210; device_id=63239d35d740137766bd3ff7e752a98c; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1690631186',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
}
f = open('雪球.csv', mode='a', newline='', encoding='utf-8')
csv_writer = csv.writer(f)
csv_writer.writerow(['symbol', 'name', 'current', 'chg', 'first_percent', 'current_year_percent', 'volume', 'amount', 'turnover_rate', 'pe_ttm',
           'dividend_yield', 'market_capital'])
for page in range(1, 168):
    url = f'https://stock.xueqiu.com/v5/stock/screener/quote/list.json?page={page}&size=30&order=desc&orderby=percent&order_by=percent&market=CN&type=sh_sz'
    # 发送请求
    response = requests.get(url, headers=headers)
    json_data = response.json()
    data_list = json_data['data']['list']
    for data in data_list:
        symbol = data['symbol']
        name = data['name']
        current = data['current']
        chg = data['chg']
        first_percent = data['first_percent']
        current_year_percent = data['current_year_percent']
        volume = data['volume']
        amount = data['amount']
        turnover_rate = data['turnover_rate']
        pe_ttm = data['pe_ttm']
        dividend_yield = data['dividend_yield']
        market_capital = data['market_capital']
        print([symbol, name, current, chg, first_percent, current_year_percent, volume, amount, turnover_rate, pe_ttm,
               dividend_yield, market_capital])
        csv_writer.writerow([symbol, name, current, chg, first_percent, current_year_percent, volume, amount, turnover_rate, pe_ttm,
               dividend_yield, market_capital])