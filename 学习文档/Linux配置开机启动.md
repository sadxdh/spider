# Linux配置开机启动

通过 systemd 的方式将 `/root/timedcrawler/run_all_scripts.sh` 在系统启动时运行，可以按照以下步骤操作：

1. 创建服务文件 `/etc/systemd/system/run_all_scripts.service`：

   ```ini
   [Unit]
   Description=Run All Scripts on Startup
   
   [Service]
   Type=simple
   ExecStart=/root/timedcrawler/run_all_scripts.sh
   Restart=always
   User=root
   
   [Install]
   WantedBy=default.target
   ```

   - `ExecStart`: 指定启动脚本的路径。
   - `User`: 替换成你希望运行脚本的用户，这里设置为 `root`。

2. 启用服务并设置为开机启动：

   ```bash
   sudo systemctl enable run_all_scripts.service
   ```

3. 启动服务：

   ```bash
   sudo systemctl start run_all_scripts.service
   ```

这样，`/root/timedcrawler/run_all_scripts.sh` 将在系统启动时自动运行。你可以通过 `sudo systemctl status run_all_scripts.service` 来查看服务的状态。确保路径和文件权限都设置正确。