import requests

cookies = {
    '__wpkreporterwid_': 'e4cd7f7f-86ee-470a-b7f0-48c65c0f5288',
    't_fv': '1708436251666',
    't_uid': 'TUrCphf4nzhmG2CwCzzheNlofjtnjvHm',
    't_sid': 'BeEhFERtLiw5M6RUmfz3Q0qOaY61ccQb',
    'utm_origin': 'https://www.bing.com/',
    'utm_channel': 'SEO',
    '__itrace_wid': '2b45db8f-9d43-4ce5-2fa6-10f9109cc8fa',
    'hng': 'TH|en|THB|764',
    'userLanguageML': 'en',
    'cna': 'HZlbHvfN2wgCAd18GhO+0tc9',
    '_m_h5_tk': '49ea3112acf96ccf982228e276cf0535_1708444893234',
    '_m_h5_tk_enc': '770c9b6b0a411654b2966730f8f96267',
    'lzd_cid': '33b62468-5878-420e-b5be-0b2071bfe6b6',
    'lzd_sid': '1ae28a9e3a5280c8dda357f46ecc171b',
    '_tb_token_': '73de63e7ae75',
    'lwrid': 'AQGNxryX6AsD%2FM4Z6PyfX38RnLi3',
    'x5sec': '7b22617365727665722d6c617a6164613b33223a22617c434b6e573071344745504b6b70494d4649676c795a574e686348526a614745776c592f347a414a4b4d4441784d44426d5a6a41774d4441774d4441774d4441344d4441774d4441774e47526b4e324d785954457a4e444d7a5a446b784d5451774d4441774d4441774d413d3d222c22733b32223a2233376432393236383063633235343863227d',
    'EGG_SESS': 'S_Gs1wHo9OvRHCMp98md7EncDkO3uZ-KtjTf6RV0YsKippz21V0tFfwUbB7dkpSR3BxsVNNBDWp80F3rhuOivzEpkf_gSYZzsPVW9alSUrF21fCnTYrne534c3zQ_3HHz2Sy0o2aqRFOEcxHcExyFc779DuDNykyku-MJuBI96I=',
    'xlly_s': '1',
    '_bl_uid': 'XXlqqsykuyCe8puzweU2w8klzX1y',
    'epssw': '1*M81611GORCeVGQGS7zF4M5ITh2e4JRDwyuJ0k66LOZyiI_QyyMi7yoDMQWvhZbXANKBC3Q0hjGXBu_95jGf9PsLO_8_VZaqmjhAR3_9Apt-GZjBvj1Ls7inN_8ZVcRx9eE0KmdTWNhhQ7b2RgOYrBLHv3YB4Eso3xv9-etyBekqdexrExlCbetyR38B4xxoEGwjUPCNG7FSExDuJQtW4W7EnxYBqy1..',
    'tfstk': 'fngi1EtPqcr6PBvi4e46JaKPNaKdfOabexQYHre2YJyCBOQtgI4msx0v1jJsnDcSQR7tkPhq-vHBGfHv1-k352nOkRp_ojk8oLpJyUhs1oa2eLd1ppzbuS8Y38aCvDzbuLpK94nf-rMlPzPhSXR3MSQV3xra8XP0L574_xyUY7PRQrzq_h1JyPxE8C43E_Xs9LRkyEyi_JboN2VNJ8T7KZrE85qiuXy3s503sl2zx1D12VkKgV3_Ae_LlXnonmkX2MaigczawfTG-zlZvqVKkII0QAgnT2rhNaZKLVD0Bzf27X4gIuuTX17sUXcq2k0paUag7RoY5jCkBX0iBfgnMsSUSPn3qV4P4wSF4o7RlWRx8isbbWN3e6QjHTTuaT1JtBj-GlPQN8dHtisbbWN3eBAh2qZaO7wR.',
    'isg': 'BMrKoEcWm9HcOhd9L1rbtKRiG7Bsu04VAwJTrVQDdp2oB2rBPEueJRBxF3vb98at',
}

headers = {
    'authority': 'www.lazada.co.th',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9,zh;q=0.8',
    # 'cookie': '__wpkreporterwid_=e4cd7f7f-86ee-470a-b7f0-48c65c0f5288; t_fv=1708436251666; t_uid=TUrCphf4nzhmG2CwCzzheNlofjtnjvHm; t_sid=BeEhFERtLiw5M6RUmfz3Q0qOaY61ccQb; utm_origin=https://www.bing.com/; utm_channel=SEO; __itrace_wid=2b45db8f-9d43-4ce5-2fa6-10f9109cc8fa; hng=TH|en|THB|764; userLanguageML=en; cna=HZlbHvfN2wgCAd18GhO+0tc9; _m_h5_tk=49ea3112acf96ccf982228e276cf0535_1708444893234; _m_h5_tk_enc=770c9b6b0a411654b2966730f8f96267; lzd_cid=33b62468-5878-420e-b5be-0b2071bfe6b6; lzd_sid=1ae28a9e3a5280c8dda357f46ecc171b; _tb_token_=73de63e7ae75; lwrid=AQGNxryX6AsD%2FM4Z6PyfX38RnLi3; x5sec=7b22617365727665722d6c617a6164613b33223a22617c434b6e573071344745504b6b70494d4649676c795a574e686348526a614745776c592f347a414a4b4d4441784d44426d5a6a41774d4441774d4441774d4441344d4441774d4441774e47526b4e324d785954457a4e444d7a5a446b784d5451774d4441774d4441774d413d3d222c22733b32223a2233376432393236383063633235343863227d; EGG_SESS=S_Gs1wHo9OvRHCMp98md7EncDkO3uZ-KtjTf6RV0YsKippz21V0tFfwUbB7dkpSR3BxsVNNBDWp80F3rhuOivzEpkf_gSYZzsPVW9alSUrF21fCnTYrne534c3zQ_3HHz2Sy0o2aqRFOEcxHcExyFc779DuDNykyku-MJuBI96I=; xlly_s=1; _bl_uid=XXlqqsykuyCe8puzweU2w8klzX1y; epssw=1*M81611GORCeVGQGS7zF4M5ITh2e4JRDwyuJ0k66LOZyiI_QyyMi7yoDMQWvhZbXANKBC3Q0hjGXBu_95jGf9PsLO_8_VZaqmjhAR3_9Apt-GZjBvj1Ls7inN_8ZVcRx9eE0KmdTWNhhQ7b2RgOYrBLHv3YB4Eso3xv9-etyBekqdexrExlCbetyR38B4xxoEGwjUPCNG7FSExDuJQtW4W7EnxYBqy1..; tfstk=fngi1EtPqcr6PBvi4e46JaKPNaKdfOabexQYHre2YJyCBOQtgI4msx0v1jJsnDcSQR7tkPhq-vHBGfHv1-k352nOkRp_ojk8oLpJyUhs1oa2eLd1ppzbuS8Y38aCvDzbuLpK94nf-rMlPzPhSXR3MSQV3xra8XP0L574_xyUY7PRQrzq_h1JyPxE8C43E_Xs9LRkyEyi_JboN2VNJ8T7KZrE85qiuXy3s503sl2zx1D12VkKgV3_Ae_LlXnonmkX2MaigczawfTG-zlZvqVKkII0QAgnT2rhNaZKLVD0Bzf27X4gIuuTX17sUXcq2k0paUag7RoY5jCkBX0iBfgnMsSUSPn3qV4P4wSF4o7RlWRx8isbbWN3e6QjHTTuaT1JtBj-GlPQN8dHtisbbWN3eBAh2qZaO7wR.; isg=BMrKoEcWm9HcOhd9L1rbtKRiG7Bsu04VAwJTrVQDdp2oB2rBPEueJRBxF3vb98at',
    'referer': 'https://www.lazada.co.th/',
    'sec-ch-ua': '"Not A(Brand";v="99", "Microsoft Edge";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
    'x-csrf-token': '73de63e7ae75',
    'x-requested-with': 'XMLHttpRequest',
}

params = {
    'ajax': 'true',
    'clickTrackInfo': 'b5dec8cf-bf00-47f3-ae97-227f7d58cef8__3973__4871584230__20__0.09993464__333258__7253__c2i__0.0',
    'from': 'hp_categories',
    'isFirstRequest': 'true',
    'item_id': '4871584230',
    'page': '1',
    'params': '{"catIdLv1":"3835","pvid":"b5dec8cf-bf00-47f3-ae97-227f7d58cef8","src":"hp_categories","categoryName":"Mobiles","categoryId":"3973"}',
    'q': 'Mobiles',
    'spm': 'a2o4m.home-th.3887232320.27.11257f6dHwdmk6',
    'src': 'hp_categories',
    'up_id': '4871584230',
    'version': 'v2',
}

response = requests.get('https://www.lazada.co.th/shop-mobiles/', params=params, cookies=cookies, headers=headers)

# print(response.json())
print(response.status_code)
print(response.json())