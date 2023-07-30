# P站视频下载-m3u8视频拼接

## 目标

![image-20230407103151763](pics/image-20230407103151763.png)

根据链接提取视频

[公開SM調教　食卓で大の字拘束され、ご主人様に鞭と筆で焦らされる性奴隷　個人撮影【あまいSM せつないＳＭ】Public S&amp;M training Sex slaves who are sprawle](https://etahub.com/events?app_id=10896&ssiteName=pornhub&splatform=desktop&sfeatureName=playerLoaded&sfeatureValue=desktop&playerName=desktop&eventName=playerLoaded&date=1680833876483&videoId=ph62f113100828f&videoTitle=公開SM調教　食卓で大の字拘束され、ご主人様に鞭と筆で焦らされる性奴隷　個人撮影[あまいSM せつないＳＭ]Public S&amp;M training Sex slaves who are sprawle&source_page=Homepage&section=SingleFeedSection&recommender=DD&recommender_info=NA&player_source=videoPage&osName=Windows&osVersion=10)

## 流程

使用url中的viewkey获取视频详细信息

![image-20230407103349831](pics/image-20230407103349831.png)

### url解码

#### url1

https://etahub.com/events?app_id=10896&ssiteName=pornhub&splatform=desktop&sfeatureName=playerLoaded&sfeatureValue=desktop&playerName=desktop&eventName=playerLoaded&date=1680833876483&videoId=ph62f113100828f&videoTitle=公開SM調教　食卓で大の字拘束され、ご主人様に鞭と筆で焦らされる性奴隷　個人撮影【あまいSM せつないＳＭ】Public S&amp;M training Sex slaves who are sprawle&source_page=Homepage&section=SingleFeedSection&recommender=DD&recommender_info=NA&player_source=videoPage&osName=Windows&osVersion=10

url负载参数：

| 参数名           | 值                                                           |
| ---------------- | ------------------------------------------------------------ |
| app_id           | 10896                                                        |
| ssiteName        | pornhub                                                      |
| splatform        | desktop                                                      |
| sfeatureName     | playerLoaded                                                 |
| sfeatureValue    | desktop                                                      |
| playerName       | desktop                                                      |
| eventName        | playerLoaded                                                 |
| date             | 1680833876483                                                |
| videoId          | ph62f113100828f                                              |
| videoTitle       | 公開SM調教　食卓で大の字拘束され、ご主人様に鞭と筆で焦らされる性奴隷　個人撮影【あまいSM せつないＳＭ】Public S&amp;M training Sex slaves who are sprawle |
| source_page      | Homepage                                                     |
| section          | SingleFeedSection                                            |
| recommender      | DD                                                           |
| recommender_info | NA                                                           |
| player_source    | videoPage                                                    |
| osName           | Windows                                                      |
| osVersion        | 10                                                           |

发现videoId就是viewkey

**必要参数：videoId**

url响应：![image-20230407112549188](pics/image-20230407112549188.png)

#### url2

https://cv-h.phncdn.com/hls/videos/202208/08/413280511/,720P_4000K,480P_2000K,240P_1000K,_413280511.mp4.urlset/master.m3u8?YfKTzlZHlZgLx0ImfwGbQASKDVTOYMTbGgayiHu0ruLZXNN52w9le0ESuzHmx986cnXjfW_pjbOEfbyCfv3sHpN3srtVH6gXLYgGW4CAgfCS78S43TRCzKX8MpqHpDDXa5_b09lFkjGYkIX6TrgPB0dmlNttvB6XK9pTl5Rzxr5I_UPeIDylXnhcGcQcrjVPVWC6hT72NJLA

| 参数名                                                       | 值   |
| ------------------------------------------------------------ | ---- |
| YfKTzlZHlZgLx0ImfwGbQASKDVTOYMTbGgayiHu0ruLZXNN52w9le0ESuzHmx986cnXjfW_pjbOEfbyCfv3sHpN3srtVH6gXLYgGW4CAgfCS78S43TRCzKX8MpqHpDDXa5_b09lFkjGYkIX6TrgPB0dmlNttvB6XK9pTl5Rzxr5I_UPeIDylXnhcGcQcrjVPVWC6hT72NJLA |      |

url响应：![image-20230407112530557](pics/image-20230407112530557.png)

#### url3

https://ev-h.phncdn.com/hls/videos/202208/08/413280511/,720P_4000K,480P_2000K,240P_1000K,_413280511.mp4.urlset/master.m3u8?validfrom=1680834943&validto=1680842143&ipa=139.144.119.139&hdl=-1&hash=YHrEFah6H8mDTXFdeRzigBB/pCM=

| 参数名    | 值                           |
| --------- | ---------------------------- |
| validfrom | 1680834943                   |
| validto   | 1680842143                   |
| ipa       | 139.144.119.139              |
| hdl       | -1                           |
| hash      | YHrEFah6H8mDTXFdeRzigBB/pCM= |

**必要参数：hash**

https://ev-h.phncdn.com/hls/videos/202208/08/413280511/,720P_4000K,480P_2000K,240P_1000K,_413280511.mp4.urlset/master.m3u8?hash=YHrEFah6H8mDTXFdeRzigBB/pCM=

url响应：![image-20230407114047517](pics/image-20230407114047517.png)

#### url2和url3只有参数差异：

https://ev-h.phncdn.com/hls/videos/202208/08/413280511/,720P_4000K,480P_2000K,240P_1000K,_413280511.mp4.urlset/master.m3u8?

|      | 参数名                   | 值                           |
| ---- | ------------------------ | ---------------------------- |
| url2 | YfKTzlZHlZgLx0ImfwGbQ... |                              |
| url3 | hash                     | YHrEFah6H8mDTXFdeRzigBB/pCM= |

**两个master.m3u8内容差异 url3:url2**

![image-20230407114641497](pics/image-20230407114641497.png)

不同之处只有参数

#### 两个参数与viewkey（videoId）的联系

搜索找不到相关联系，考虑参数是代码生成

找到hash生成代码源头

https://cdn1d-static-shared.phncdn.com/html5player/videoPlayer/es6player/6.3.2/desktop-player-adaptive-hls-hlsjs.min.js

![image-20230407122300898](pics/image-20230407122300898.png)

![image-20230407122445576](pics/image-20230407122445576.png)

下载代码，用IDE打开查看

