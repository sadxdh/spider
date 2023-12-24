import subprocess

def run_adb_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    output, _ = process.communicate()
    return output.decode("utf-8")

# 获取Chrome浏览器当前活动页面的源代码
def get_chrome_page_source():
    # 查找Chrome的包名
    package = run_adb_command("adb shell 'pm list packages | grep chrome'")
    package_name = package.split(":")[1].strip()

    # 执行JavaScript命令来获取页面源代码
    js_command = "content_shell.dumper.dump()"
    adb_shell_cmd = f"adb shell run-as {package_name} /system/bin/sh -c '/data/local/tmp/chrome-command-line -t about:blank --dump-dom'"

    # 运行ADB命令获取页面源代码
    page_source = run_adb_command(adb_shell_cmd)

    return page_source

# 获取Chrome浏览器中当前活动页面的源代码
chrome_page_source = get_chrome_page_source()
print(chrome_page_source)  # 输出获取到的页面源代码
