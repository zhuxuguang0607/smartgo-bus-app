        // 更新时间
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
        }
        updateTime();
        setInterval(updateTime, 60000);

        // 浦东14路站点数据(正向:张江地铁站 → 益江路盛夏路)
        const route14Data = {
            forward: {
                start: '张江地铁站',
                end: '益江路盛夏路',
                stations: [
                    { name: '张江地铁站', metro: ['2'] },
                    { name: '张江路孙桥路' },
                    { name: '张江路龙东大道' },
                    { name: '龙东大道张江路' },
                    { name: '龙东大道川杨河桥' },
                    { name: '龙东大道华益路', metro: ['7', '13'] },
                    { name: '龙东大道唐黄路' },
                    { name: '龙东大道金葵路' },
                    { name: '龙东大道金海路' },
                    { name: '龙东大道金穗路' },
                    { name: '龙东大道锦绣路' },
                    { name: '龙东大道银霄路' },
                    { name: '巨峰路龙东大道' },
                    { name: '巨峰路华东路' },
                    { name: '巨峰路栖山路' },
                    { name: '巨峰路金豫路' },
                    { name: '金桥路巨峰路' },
                    { name: '金桥路金港路', metro: ['6'] },
                    { name: '金桥路博兴路' },
                    { name: '平度路金桥路' },
                    { name: '平度路长岛路', metro: ['16'] },
                    { name: '金港路平度路' },
                    { name: '金港路盛夏路', metro: ['2', '16'] },
                    { name: '益江路盛夏路' }
                ],
                currentStation: 3
            },
            backward: {
                start: '益江路盛夏路',
                end: '张江地铁站',
                stations: [
                    { name: '益江路盛夏路' },
                    { name: '金港路盛夏路', metro: ['2', '16'] },
                    { name: '金港路平度路' },
                    { name: '平度路长岛路', metro: ['16'] },
                    { name: '平度路金桥路' },
                    { name: '金桥路博兴路' },
                    { name: '金桥路金港路', metro: ['6'] },
                    { name: '金桥路巨峰路' },
                    { name: '巨峰路金豫路' },
                    { name: '巨峰路栖山路' },
                    { name: '巨峰路华东路' },
                    { name: '巨峰路龙东大道' },
                    { name: '龙东大道银霄路' },
                    { name: '龙东大道锦绣路' },
                    { name: '龙东大道金穗路' },
                    { name: '龙东大道金海路' },
                    { name: '龙东大道金葵路' },
                    { name: '龙东大道唐黄路' },
                    { name: '龙东大道华益路', metro: ['7', '13'] },
                    { name: '龙东大道川杨河桥' },
                    { name: '龙东大道张江路' },
                    { name: '张江路龙东大道' },
                    { name: '张江路孙桥路' },
                    { name: '张江地铁站', metro: ['2'] }
                ],
                currentStation: 3
            }
        };

        let currentDirection = 'forward';

        // 渲染站点进度条
        function renderStations() {
            const direction = route14Data[currentDirection];
            const stations = direction.stations;
            const currentIdx = direction.currentStation;

            const progressTrack = document.getElementById('progressTrack');
            const stationNames = document.getElementById('stationNames');
            const progressFill = document.getElementById('progressFill');

            // 更新路线方向信息
            document.querySelector('.route-start').textContent = direction.start;
            document.querySelector('.route-end').textContent = direction.end;

            // 清空现有内容
            progressTrack.innerHTML = '<div class="progress-fill" id="progressFill"></div>';
            stationNames.innerHTML = '';

            // 计算每个站点的位置
            const stationWidth = 80; // 每个站点之间的间距
            const totalWidth = (stations.length - 1) * stationWidth;

            // 动态生成站点点和名称
            stations.forEach((station, index) => {
                const position = (index / (stations.length - 1)) * totalWidth;

                // 创建站点点
                const point = document.createElement('div');
                point.className = 'station-point';
                if (index < currentIdx) {
                    point.classList.add('passed');
                } else if (index === currentIdx) {
                    point.classList.add('current');
                }
                point.style.left = `${position}px`;
                progressTrack.appendChild(point);

                // 创建站点名称
                const nameItem = document.createElement('div');
                nameItem.className = 'station-item';
                if (index === currentIdx) {
                    nameItem.classList.add('current');
                }
                // 设置位置与进度条点对齐
                nameItem.style.left = `${position}px`;

                // 特殊处理首尾站点的对齐方式
                if (index === 0) {
                    // 第一个站点:左对齐
                    nameItem.style.transform = 'translateX(0)';
                } else if (index === stations.length - 1) {
                    // 最后一个站点:右对齐
                    nameItem.style.transform = 'translateX(-100%)';
                } else {
                    // 中间站点:居中对齐
                    nameItem.style.transform = 'translateX(-50%)';
                }

                // 上下交错排列:偶数站点在线路上方,奇数站点在线路下方
                if (index % 2 === 0) {
                    // 上方:向上偏移(负值)
                    nameItem.style.bottom = '16px'; // 距离线路16px
                } else {
                    // 下方:向下偏移(正值)
                    nameItem.style.top = '16px'; // 距离线路16px
                }

                const content = document.createElement('div');
                content.className = 'station-content';

                // 添加站点编号
                const stationNum = document.createElement('div');
                stationNum.className = 'station-number';
                stationNum.textContent = index + 1;
                content.appendChild(stationNum);

                // 创建站点名称和地铁标识的包装器
                const nameWrapper = document.createElement('div');
                nameWrapper.className = 'station-name-wrapper';

                const nameText = document.createElement('span');
                nameText.className = 'station-name-text';
                nameText.textContent = station.name;
                nameWrapper.appendChild(nameText);

                content.appendChild(nameWrapper);

                // 添加地铁线路徽章(横向排列)
                if (station.metro && station.metro.length > 0) {
                    const metroBadgesContainer = document.createElement('div');
                    metroBadgesContainer.className = 'metro-badges';

                    station.metro.forEach(line => {
                        const metroBadge = document.createElement('span');
                        metroBadge.className = `metro-badge metro-line-${line}`;
                        metroBadge.textContent = `${line}号线`;
                        metroBadgesContainer.appendChild(metroBadge);
                    });

                    content.appendChild(metroBadgesContainer);
                }

                nameItem.appendChild(content);
                stationNames.appendChild(nameItem);
            });

            // 更新进度条宽度
            const progressPercent = (currentIdx / (stations.length - 1)) * 100;
            document.getElementById('progressFill').style.width = `${(currentIdx / (stations.length - 1)) * totalWidth}px`;

            // 设置容器宽度以支持滚动
            progressTrack.style.width = `${totalWidth}px`;
            stationNames.style.width = `${totalWidth}px`;
        }

        // 换向功能
        function switchDirection() {
            currentDirection = currentDirection === 'forward' ? 'backward' : 'forward';
            renderStations();
        }

        // 显示发车时刻表
        function showSchedule() {
            alert('发车时刻表功能开发中...\n首班:07:00\n末班:21:30\n间隔:8-15分钟');
        }

        // 设置目标下车站点
        function setTargetStation() {
            const direction = route14Data[currentDirection];
            const stations = direction.stations;
            const currentIdx = direction.currentStation;

            // 获取弹框元素
            const overlay = document.getElementById('stationSelectOverlay');
            const content = document.getElementById('stationSelectContent');

            // 清空内容
            content.innerHTML = '';

            // 生成站点列表(显示所有站点,当前站之前的禁用)
            stations.forEach((station, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'station-option';

                // 如果是当前站或之前的站点,禁用
                const isDisabled = index <= currentIdx;
                if (isDisabled) {
                    optionDiv.classList.add('disabled');
                } else {
                    optionDiv.onclick = () => selectStation(index);
                }

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'targetStation';
                radio.value = index;
                radio.id = `station-${index}`;
                radio.disabled = isDisabled;

                const label = document.createElement('label');
                label.className = 'station-option-label';
                label.htmlFor = `station-${index}`;
                label.textContent = station.name;

                optionDiv.appendChild(radio);
                optionDiv.appendChild(label);
                content.appendChild(optionDiv);
            });

            // 隐藏tab导航
            const tabNav = document.querySelector('.tab-navigation');
            if (tabNav) tabNav.style.display = 'none';

            // 隐藏底部导航栏
            const bottomNav = document.querySelector('.bottom-nav');
            if (bottomNav) bottomNav.style.display = 'none';

            // 显示弹框
            overlay.classList.add('active');
        }

        // 选择站点
        function selectStation(index) {
            const radio = document.getElementById(`station-${index}`);
            if (radio) {
                radio.checked = true;
            }
        }

        // 关闭站点选择弹框
        function closeStationSelect() {
            const overlay = document.getElementById('stationSelectOverlay');
            overlay.classList.remove('active');

            // 显示tab导航
            const tabNav = document.querySelector('.tab-navigation');
            if (tabNav) tabNav.style.display = 'flex';

            // 显示底部导航栏
            const bottomNav = document.querySelector('.bottom-nav');
            if (bottomNav) bottomNav.style.display = 'flex';
        }

        // 确认设置下车站点
        function confirmStationSelect() {
            const selectedRadio = document.querySelector('input[name="targetStation"]:checked');
            if (!selectedRadio) {
                alert('请先选择一个下车站点');
                return;
            }

            const stationIndex = parseInt(selectedRadio.value);
            const direction = route14Data[currentDirection];
            const stationName = direction.stations[stationIndex].name;

            // 更新提醒按钮状态
            const reminderButton = document.getElementById('reminderButton');
            reminderButton.classList.add('active');

            // 关闭弹框
            closeStationSelect();

            // 显示提示
            alert(`已设置下车提醒:${stationName}\n到站前将提醒您下车`);
        }

        // ========== 周边生活模块 ==========
        let currentLifeTab = 0;

        function switchLifeTab(index) {
            currentLifeTab = index;
            const tabs = document.querySelectorAll('.life-tab');
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            renderLifeContent();
        }

        function renderLifeContent() {
            const content = document.getElementById('lifeContent');
            const tabContents = document.querySelectorAll('.tab-content-area');

            if (currentLifeTab === 0) {
                // 推荐 = 沿途优惠内容 (Tab 0)
                if (tabContents[0]) {
                    content.innerHTML = tabContents[0].innerHTML;
                }
            } else if (currentLifeTab === 1) {
                // 美食 (Tab 4)
                if (tabContents[4]) {
                    content.innerHTML = tabContents[4].innerHTML;
                }
            } else if (currentLifeTab === 2) {
                // 玩乐
                content.innerHTML = `
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">上海迪士尼乐园</div>
                            <div class="poi-detail">
                                <span class="poi-distance">2.3km</span>
                                <span>|</span>
                                <span>主题乐园</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">世纪公园</div>
                            <div class="poi-detail">
                                <span class="poi-distance">3.8km</span>
                                <span>|</span>
                                <span>城市公园</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">张江高科技园区</div>
                            <div class="poi-detail">
                                <span class="poi-distance">1.2km</span>
                                <span>|</span>
                                <span>科技园区</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                `;
            } else if (currentLifeTab === 3) {
                // 景点 (Tab 5)
                if (tabContents[5]) {
                    content.innerHTML = tabContents[5].innerHTML;
                }
            }
        }

        // ========== 应急服务模块 ==========
        let currentEmergencyTab = 0;

        function switchEmergencyTab(index) {
            currentEmergencyTab = index;
            const tabs = document.querySelectorAll('.emergency-tab');
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            renderEmergencyContent();
        }

        function renderEmergencyContent() {
            const content = document.getElementById('emergencyContent');
            const tabContents = document.querySelectorAll('.tab-content-area');

            if (currentEmergencyTab === 0) {
                // 厕所 (Tab 1)
                if (tabContents[1]) {
                    content.innerHTML = tabContents[1].innerHTML;
                }
            } else if (currentEmergencyTab === 1) {
                // 便利店 (Tab 2)
                if (tabContents[2]) {
                    content.innerHTML = tabContents[2].innerHTML;
                }
            } else if (currentEmergencyTab === 2) {
                // 药店
                content.innerHTML = `
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">国大药房(张江店)</div>
                            <div class="poi-detail">
                                <span class="poi-distance">520m</span>
                                <span>|</span>
                                <span>营业中 8:00-22:00</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">华氏大药房</div>
                            <div class="poi-detail">
                                <span class="poi-distance">680m</span>
                                <span>|</span>
                                <span>营业中 24小时</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">益丰大药房</div>
                            <div class="poi-detail">
                                <span class="poi-distance">920m</span>
                                <span>|</span>
                                <span>营业中 8:30-21:30</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                `;
            } else if (currentEmergencyTab === 3) {
                // 银行
                content.innerHTML = `
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">中国工商银行(张江支行)</div>
                            <div class="poi-detail">
                                <span class="poi-distance">450m</span>
                                <span>|</span>
                                <span>营业中 9:00-17:00</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">中国建设银行ATM</div>
                            <div class="poi-detail">
                                <span class="poi-distance">380m</span>
                                <span>|</span>
                                <span>24小时</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">招商银行(张江支行)</div>
                            <div class="poi-detail">
                                <span class="poi-distance">720m</span>
                                <span>|</span>
                                <span>营业中 9:00-17:00</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('导航功能')">导航</button>
                    </div>
                `;
            }
        }

        // ========== 换乘信息模块 ==========
        let currentTransferTab = 0;

        function switchTransferTab(index) {
            currentTransferTab = index;
            const tabs = document.querySelectorAll('.transfer-tab');
            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            renderTransferContent();
        }

        function renderTransferContent() {
            const content = document.getElementById('transferContent');

            if (currentTransferTab === 0) {
                // 地铁换乘
                content.innerHTML = `
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">地铁2号线 - 张江高科站</div>
                            <div class="poi-detail">
                                <span class="poi-distance">120m</span>
                                <span>|</span>
                                <span>A/B/C/D口</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('查看线路')">查看</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">地铁13号线 - 华夏中路站</div>
                            <div class="poi-detail">
                                <span class="poi-distance">890m</span>
                                <span>|</span>
                                <span>1/2号口</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('查看线路')">查看</button>
                    </div>
                `;
            } else if (currentTransferTab === 1) {
                // 公交换乘
                content.innerHTML = `
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">张江地铁站 - 公交站</div>
                            <div class="poi-detail">
                                <span class="poi-distance">50m</span>
                                <span>|</span>
                                <span>14路、188路、浦东56路</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('查看线路')">查看</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">张江路孙桥路 - 公交站</div>
                            <div class="poi-detail">
                                <span class="poi-distance">320m</span>
                                <span>|</span>
                                <span>浦东25路、983路</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('查看线路')">查看</button>
                    </div>
                `;
            } else if (currentTransferTab === 2) {
                // 共享单车
                content.innerHTML = `
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">哈啰单车停放点</div>
                            <div class="poi-detail">
                                <span class="poi-distance">80m</span>
                                <span>|</span>
                                <span>可用车辆: 12辆</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('扫码用车')">用车</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">美团单车停放点</div>
                            <div class="poi-detail">
                                <span class="poi-distance">150m</span>
                                <span>|</span>
                                <span>可用车辆: 8辆</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('扫码用车')">用车</button>
                    </div>
                    <div class="poi-card">
                        <div class="poi-info">
                            <div class="poi-name">青桔单车停放点</div>
                            <div class="poi-detail">
                                <span class="poi-distance">200m</span>
                                <span>|</span>
                                <span>可用车辆: 5辆</span>
                            </div>
                        </div>
                        <button class="poi-action" onclick="alert('扫码用车')">用车</button>
                    </div>
                `;
            }
        }

        // ========== 主标签页点击事件 ==========
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化内容
            renderLifeContent();
            renderEmergencyContent();
            renderTransferContent();

            // 为所有main-tab添加点击事件(简单tab切换,不滚动页面)
            const mainTabs = document.querySelectorAll('.main-tab');
            const contentSections = document.querySelectorAll('.content-section');

            mainTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // 移除所有tab的active状态
                    mainTabs.forEach(t => t.classList.remove('active'));
                    // 添加当前tab的active状态
                    this.classList.add('active');

                    // 隐藏所有内容区域
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                    });

                    // 显示对应的内容区域
                    const targetId = this.getAttribute('data-target');
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.classList.add('active');
                    }
                });
            });
        });

        // 打开支付宝乘车码
        function openAlipayQR() {
            // 尝试调起支付宝乘车码
            const alipayScheme = 'alipays://platformapi/startapp?appId=200011235';

            // 创建隐藏的iframe尝试打开支付宝
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = alipayScheme;
            document.body.appendChild(iframe);

            // 2秒后移除iframe
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 2000);

            // 如果无法打开支付宝,显示提示
            setTimeout(() => {
                alert('正在打开支付宝乘车码...\n如未自动跳转,请手动打开支付宝APP > 出行 > 乘车码');
            }, 500);
        }

        // 选择操作按钮
        function selectActionButton(button, callback) {
            // 移除所有按钮的选中状态
            document.querySelectorAll('.action-btn-new').forEach(btn => {
                btn.classList.remove('selected');
            });

            // 添加选中状态
            button.classList.add('selected');

            // 执行回调函数
            if (callback && typeof callback === 'function') {
                callback();
            }

            // 2秒后移除选中状态(所有按钮统一行为)
            setTimeout(() => {
                button.classList.remove('selected');
            }, 2000);
        }

        // 刷新站点信息
        function refreshStations() {
            showToast('正在刷新站点信息...');
            // 模拟刷新延迟
            setTimeout(() => {
                renderStations();
                showToast('刷新成功!');
            }, 800);
        }

        // 页面加载时渲染站点
        document.addEventListener('DOMContentLoaded', function() {
            renderStations();
            initNearbyCards();
            initMomentCards();
        });

        // 切换主模块(首页/实时公交/互动/我的)
        function switchMainModule(index) {
            // 先滚动到顶部
            window.scrollTo({top: 0, behavior: 'instant'});
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // 移除所有模块的active类
            document.querySelectorAll('.main-module').forEach(module => {
                module.classList.remove('active');
            });

            // 移除所有底部导航的active类
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });

            // 激活对应的模块和导航
            const modules = ['homeModule', 'busModule', 'interactModule', 'profileModule'];
            document.getElementById(modules[index]).classList.add('active');
            document.querySelectorAll('.nav-item')[index].classList.add('active');

            // 再次确保滚动到顶部
            setTimeout(() => {
                window.scrollTo({top: 0, behavior: 'instant'});
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 10);
        }

        // 切换首页Tab(附近站点/历史线路)
        function switchHomeTab(index) {
            const tabs = document.querySelectorAll('.home-tab');
            const contents = document.querySelectorAll('.home-tab-content');

            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                    contents[i].classList.add('active');
                } else {
                    tab.classList.remove('active');
                    contents[i].classList.remove('active');
                }
            });
        }

        // 切换互动模块Tab(逛逛/附近的人)
        function switchInteractTab(index) {
            const tabs = document.querySelectorAll('.interact-tab');
            const contents = document.querySelectorAll('.interact-content');

            tabs.forEach((tab, i) => {
                if (i === index) {
                    tab.classList.add('active');
                    contents[i].classList.add('active');
                } else {
                    tab.classList.remove('active');
                    contents[i].classList.remove('active');
                }
            });
        }

        // 切换点赞状态
        function toggleLike(button) {
            const likeCountSpan = button.querySelector('.like-count');
            let count = parseInt(likeCountSpan.textContent);

            if (button.classList.contains('liked')) {
                // 取消点赞
                button.classList.remove('liked');
                count--;
            } else {
                // 点赞
                button.classList.add('liked');
                count++;
            }

            likeCountSpan.textContent = count;
        }

        // 切换评论区显示
        function toggleCommentBox(momentId) {
            const commentSection = document.getElementById(momentId + '-comments');
            if (commentSection.style.display === 'none') {
                commentSection.style.display = 'block';
                // 聚焦到输入框
                const input = document.getElementById(momentId + '-input');
                setTimeout(() => input.focus(), 100);
            } else {
                commentSection.style.display = 'none';
            }
        }

        // 提交评论
        function submitComment(momentId) {
            const input = document.getElementById(momentId + '-input');
            const commentText = input.value.trim();

            if (!commentText) {
                showToast('请输入评论内容');
                return;
            }

            const commentSection = document.getElementById(momentId + '-comments');
            const commentsList = commentSection.querySelector('.comments-list');

            // 创建新评论元素
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `
                <span class="comment-user">我:</span>
                <span class="comment-text">${commentText}</span>
            `;

            // 添加到评论列表
            commentsList.appendChild(commentItem);

            // 更新评论计数
            const commentBtn = commentSection.previousElementSibling.querySelector('.moment-comment-btn');
            const countSpan = commentBtn.querySelector('.comment-count');
            let count = parseInt(countSpan.textContent);
            countSpan.textContent = count + 1;

            // 清空输入框
            input.value = '';

            showToast('评论成功');
        }

        // 附近的人卡片滑动
        let currentNearbyIndex = 0;
        function switchNearbyCard(direction) {
            const cards = document.querySelectorAll('.nearby-person-card');
            const totalCards = cards.length;

            // 移除所有状态
            cards.forEach(card => {
                card.classList.remove('active', 'prev', 'next');
            });

            // 更新当前索引
            currentNearbyIndex += direction;
            if (currentNearbyIndex < 0) currentNearbyIndex = 0;
            if (currentNearbyIndex >= totalCards) currentNearbyIndex = totalCards - 1;

            // 设置当前卡片和相邻卡片的状态
            cards[currentNearbyIndex].classList.add('active');

            if (currentNearbyIndex > 0) {
                cards[currentNearbyIndex - 1].classList.add('prev');
            }

            if (currentNearbyIndex < totalCards - 1) {
                cards[currentNearbyIndex + 1].classList.add('next');
            }

            // 更新指示器
            document.getElementById('nearbyCurrentIndex').textContent = currentNearbyIndex + 1;

            // 更新按钮状态
            document.getElementById('nearbyPrevBtn').disabled = currentNearbyIndex === 0;
            document.getElementById('nearbyNextBtn').disabled = currentNearbyIndex === totalCards - 1;
        }

        // 初始化附近的人卡片
        function initNearbyCards() {
            const cards = document.querySelectorAll('.nearby-person-card');
            document.getElementById('nearbyTotalCount').textContent = cards.length;

            if (cards.length > 1) {
                cards[1].classList.add('next');
            }

            // 初始化按钮状态
            document.getElementById('nearbyPrevBtn').disabled = true;
        }

        // 逛逛卡片滑动
        let currentMomentIndex = 0;
        function switchMomentCard(direction) {
            const cards = document.querySelectorAll('.moment-card');
            const totalCards = cards.length;

            // 移除所有状态
            cards.forEach(card => {
                card.classList.remove('active', 'prev', 'next');
            });

            // 更新当前索引
            currentMomentIndex += direction;
            if (currentMomentIndex < 0) currentMomentIndex = 0;
            if (currentMomentIndex >= totalCards) currentMomentIndex = totalCards - 1;

            // 设置当前卡片和相邻卡片的状态
            cards[currentMomentIndex].classList.add('active');

            if (currentMomentIndex > 0) {
                cards[currentMomentIndex - 1].classList.add('prev');
            }

            if (currentMomentIndex < totalCards - 1) {
                cards[currentMomentIndex + 1].classList.add('next');
            }

            // 更新指示器
            document.getElementById('momentCurrentIndex').textContent = currentMomentIndex + 1;

            // 更新按钮状态
            document.getElementById('momentPrevBtn').disabled = currentMomentIndex === 0;
            document.getElementById('momentNextBtn').disabled = currentMomentIndex === totalCards - 1;
        }

        // 初始化逛逛卡片
        function initMomentCards() {
            const cards = document.querySelectorAll('.moment-card');

            // 初始化按钮状态
            document.getElementById('momentPrevBtn').disabled = true;
            if (cards.length <= 1) {
                document.getElementById('momentNextBtn').disabled = true;
            }
        }

        // 单聊功能
        let currentChatUser = {};

        function openChat(userName, userAvatar) {
            currentChatUser = { name: userName, avatar: userAvatar };
            document.getElementById('chatUserName').textContent = userName;
            document.getElementById('chatMessages').innerHTML = `
                <div class="chat-message">
                    <div class="chat-message-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">${userAvatar}</div>
                    <div class="chat-message-content">你好!很高兴认识你~</div>
                </div>
            `;
            document.getElementById('chatModal').classList.add('show');
        }

        function closeChat() {
            document.getElementById('chatModal').classList.remove('show');
            document.getElementById('chatInput').value = '';
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();

            if (!message) {
                showToast('请输入消息内容');
                return;
            }

            const messagesContainer = document.getElementById('chatMessages');

            // 添加我发送的消息
            const sentMessage = document.createElement('div');
            sentMessage.className = 'chat-message sent';
            sentMessage.innerHTML = `
                <div class="chat-message-avatar">😊</div>
                <div class="chat-message-content">${message}</div>
            `;
            messagesContainer.appendChild(sentMessage);

            // 清空输入框
            input.value = '';

            // 滚动到底部
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // 模拟对方回复
            setTimeout(() => {
                const replyMessage = document.createElement('div');
                replyMessage.className = 'chat-message';
                replyMessage.innerHTML = `
                    <div class="chat-message-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">${currentChatUser.avatar}</div>
                    <div class="chat-message-content">收到!我们可以一起聊聊天~</div>
                `;
                messagesContainer.appendChild(replyMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }

        // 支持回车发送
        document.addEventListener('DOMContentLoaded', function() {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
        });

        // 展开/收起线路列表
        function toggleRouteExpand(element) {
            showToast('查看更多线路...');
        }

        // 切换Tab(实时公交页面内的7个Tab)
        function switchTab(index) {
            const buttons = document.querySelectorAll('.tab-button');
            const contents = document.querySelectorAll('.tab-content-area');

            buttons.forEach((btn, i) => {
                if (i === index) {
                    btn.classList.add('active');
                    contents[i].classList.add('active');
                } else {
                    btn.classList.remove('active');
                    contents[i].classList.remove('active');
                }
            });

            // Update URL hash
            const hashMap = ['offers', 'restroom', 'store', 'lost-found', 'food', 'scenic'];
            if (hashMap[index]) {
                history.replaceState(null, null, '#' + hashMap[index]);
            }
        }

        // Handle hash-based navigation
        function handleHashChange() {
            const hash = window.location.hash.substring(1);
            const hashToIndex = {
                'offers': 0,
                'restroom': 1,
                'store': 2,
                'lost-found': 3,
                'food': 4,
                'scenic': 5
            };

            if (hashToIndex.hasOwnProperty(hash)) {
                switchTab(hashToIndex[hash]);
            } else if (!hash) {
                switchTab(0); // Default to first tab
            }
        }

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Initialize on page load
        window.addEventListener('DOMContentLoaded', handleHashChange);

        // 连接WiFi
        function connectWiFi() {
            showToast('正在连接南京公交免费WiFi...');
            setTimeout(() => {
                showToast('WiFi连接成功!');
            }, 1500);
        }

        // 设置下车提醒
        // 显示下车提醒弹框
        function showReminderPopup() {
            document.getElementById('reminderPopup').classList.add('show');
        }

        // 关闭下车提醒弹框
        function closeReminderPopup() {
            document.getElementById('reminderPopup').classList.remove('show');
        }

        // 确认开启下车提醒
        function confirmReminder() {
            closeReminderPopup();
            showToast('下车提醒已开启,到站前会提醒您!');
        }

        function setReminder() {
            showToast('下车提醒已开启,到站前会提醒您!');
        }

        // 显示领取页面
        function showClaimPage() {
            document.getElementById('claimPage').classList.add('show');
            // 隐藏tab导航
            const tabNav = document.querySelector('.tab-navigation');
            if (tabNav) tabNav.style.display = 'none';
        }

        // 关闭领取页面
        function closeClaimPage() {
            document.getElementById('claimPage').classList.remove('show');
            // 显示tab导航
            const tabNav = document.querySelector('.tab-navigation');
            if (tabNav) tabNav.style.display = 'flex';
        }

        // 下载优惠券
        function downloadVoucher() {
            showToast('优惠券已保存到相册');
        }

        // 打开图片预览
        function openImagePreview(imageSrc) {
            const modal = document.getElementById('imagePreviewModal');
            const previewImg = document.getElementById('previewImage');
            previewImg.src = imageSrc;
            modal.classList.add('show');
        }

        // 关闭图片预览
        function closeImagePreview() {
            const modal = document.getElementById('imagePreviewModal');
            modal.classList.remove('show');
        }

        // 为所有卡片图片添加点击事件
        document.addEventListener('DOMContentLoaded', function() {
            // 为美食卡片图片添加点击事件
            document.querySelectorAll('.food-image').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openImagePreview(this.src);
                });
            });

            // 为景点卡片图片添加点击事件
            document.querySelectorAll('.scenic-banner').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openImagePreview(this.src);
                });
            });

            // 为优惠卡片图片添加点击事件
            document.querySelectorAll('.offer-image').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openImagePreview(this.src);
                });
            });
        });

        // 查看优惠
        function viewOffer(name) {
            showToast(`正在查看 ${name} 详情...`);
        }

        // 查看美食
        function viewFood(name) {
            showToast(`正在查看 ${name} 详情...`);
        }

        // 查看失物招领
        function viewLostFound(item) {
            showToast(`正在查看 ${item} 详情...`);
            setTimeout(() => {
                alert(`失物招领详情\n\n物品:${item}\n\n如需认领,请联系公交公司失物招领处\n📞 客服电话:021-12345678\n⏰ 工作时间:9:00-18:00\n\n温馨提示:认领时请提供物品详细特征及有效证件`);
            }, 500);
        }

        // 联系司机拨号
        async function callDriver(event) {
            event.stopPropagation(); // 阻止事件冒泡,避免触发卡片的点击事件

            try {
                // 从后端API获取司机电话（安全做法）
                // TODO: 替换为真实的后端API地址
                const response = await fetch('/api/bus/driver-contact', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('获取联系方式失败');
                }

                const data = await response.json();
                const driverPhone = data.phone;

                // 直接使用 tel: 协议调起手机拨号
                window.location.href = `tel:${driverPhone}`;
            } catch (error) {
                console.error('获取司机联系方式失败:', error);
                showToast('暂时无法联系司机，请稍后再试');
            }
        }

        // 导航
        function navigate(place) {
            showToast(`正在打开百度地图导航到 ${place}...`);

            // 常见地点坐标映射表(百度坐标系BD09)
            const locationMap = {
                '全家便利店盛荣路店': { lat: 31.1976, lng: 121.6104 },
                '罗森便利店张江店': { lat: 31.1980, lng: 121.6108 },
                '7-11张江高科站': { lat: 31.1978, lng: 121.6106 },
                '喜士多便利店': { lat: 31.1972, lng: 121.6098 },
                '张江盛荣路公厕': { lat: 31.1970, lng: 121.6100 },
                '星巴克张江店': { lat: 31.1985, lng: 121.6115 },
                '麦当劳张江店': { lat: 31.1988, lng: 121.6118 }
            };

            // 获取目标坐标
            const destination = locationMap[place] || { lat: 31.1986, lng: 121.6114 };

            // 尝试获取当前位置
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // 成功获取当前位置
                        const currentLat = position.coords.latitude;
                        const currentLng = position.coords.longitude;

                        openBaiduMap(currentLat, currentLng, '当前位置', destination.lat, destination.lng, place);
                    },
                    (error) => {
                        // 获取位置失败,使用默认起点(张江地铁站)
                        console.log('定位失败,使用默认起点', error);
                        openBaiduMap(31.1966, 121.6094, '张江地铁站', destination.lat, destination.lng, place);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                // 浏览器不支持定位,使用默认起点
                openBaiduMap(31.1966, 121.6094, '张江地铁站', destination.lat, destination.lng, place);
            }
        }

        // 打开百度地图APP进行导航
        function openBaiduMap(originLat, originLng, originName, destLat, destLng, destName) {
            // 百度地图导航URL Scheme
            // origin: 起点坐标和名称
            // destination: 终点坐标和名称
            // mode: 导航方式 (walking=步行, driving=驾车, transit=公交)
            // coord_type: 坐标类型 (bd09ll=百度经纬度坐标, gcj02=国测局坐标, wgs84=GPS坐标)
            const baiduMapUrl = `baidumap://map/direction?origin=latlng:${originLat},${originLng}|name:${encodeURIComponent(originName)}&destination=latlng:${destLat},${destLng}|name:${encodeURIComponent(destName)}&mode=walking&coord_type=gcj02`;

            // 尝试打开百度地图APP
            window.location.href = baiduMapUrl;

            // 备选方案:如果3秒后仍在页面,说明可能没有安装百度地图APP,提供Web版链接
            setTimeout(() => {
                if (document.visibilityState === 'visible') {
                    const webUrl = `https://api.map.baidu.com/direction?origin=${originLat},${originLng}&destination=${destLat},${destLng}&mode=walking&region=上海&output=html&coord_type=gcj02&src=webapp`;
                    if (confirm('未检测到百度地图APP,是否使用网页版导航?')) {
                        window.open(webUrl, '_blank');
                    }
                }
            }, 3000);
        }

        // 查看详情
        function viewDetail(place) {
            alert(`${place} 详细信息\n\n✓ 设施完善\n✓ 服务周到\n✓ 交通便利`);
        }

        // 拨打电话
        function callPhone(phone) {
            if (confirm(`拨打电话:${phone}?`)) {
                showToast('正在拨打电话...');
                window.location.href = `tel:${phone}`;
            }
        }

        // 查看商场楼层
        function viewMallFloor(mall) {
            alert(`${mall} 楼层导览\n\nB2-B1: 超市、餐饮\n1F: 化妆品、珠宝\n2-3F: 女装、男装\n4-5F: 运动、儿童\n6F: 美食广场\n7-8F: 电影院、娱乐`);
        }

        // 购票
        function buyTicket(scenic) {
            showToast(`正在跳转到${scenic}购票页面...`);
        }

        // 携程购票
        function buyOnCtrip(scenic) {
            showToast(`正在跳转携程购买${scenic}门票...`);
        }

        // Toast提示
        function showToast(message) {
            const existingToast = document.querySelector('.toast');
            if (existingToast) {
                existingToast.remove();
            }

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                max-width: 80%;
                text-align: center;
            `;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 2000);
        }

        // 切换位置
        function switchLocation() {
            const options = ['使用GPS定位', '手动选择位置', '从历史位置选择'];
            const choice = confirm('切换定位方式?\n\n1. 使用GPS定位\n2. 手动选择位置\n3. 从历史位置选择');
            if (choice) {
                showToast('正在更新位置...');
            }
        }

        // 切换站点路线显示
        function toggleStation(element) {
            const routeList = element.querySelector('.route-list');
            if (routeList.style.display === 'none') {
                routeList.style.display = 'flex';
            } else {
                routeList.style.display = 'none';
            }
        }

        // 进度条动画
        let progress = 65;
        setInterval(() => {
            progress = (progress + 1) % 100;
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
        }, 30000);

        // 禁止双击放大
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // 更新实时公交页面的时间
        function updateCurrentTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeString = `${hours}:${minutes}`;

            const element = document.getElementById('currentTime');
            if (element) {
                element.textContent = timeString;
            }
        }

        // 页面加载时立即更新时间
        updateCurrentTime();

        // 每分钟更新一次时间
        setInterval(updateCurrentTime, 60000);

        // ==================== AI对话交互功能 ====================
        let isRecording = false;
        let recognition = null;

        // 监听输入框变化,控制发送按钮状态
        const aiInput = document.getElementById('aiInput');
        const sendBtn = document.getElementById('sendBtn');

        aiInput.addEventListener('input', function() {
            sendBtn.disabled = this.value.trim() === '';
            // 自动调整高度
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });

        // 回车发送(Shift+Enter换行)
        aiInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!sendBtn.disabled) {
                    sendMessage();
                }
            }
        });

        // 发送消息
        function sendMessage() {
            const message = aiInput.value.trim();
            if (!message) return;

            // 显示用户消息
            addMessage('user', message);

            // 清空输入框
            aiInput.value = '';
            aiInput.style.height = 'auto';
            sendBtn.disabled = true;

            // 隐藏欢迎区域和快捷问题
            document.getElementById('aiWelcome').style.display = 'none';
            document.getElementById('quickQuestions').style.display = 'none';
            document.getElementById('chatMessages').classList.add('active');

            // 隐藏天气、城市、通知，显示返回按钮
            document.getElementById('weatherInfo').style.display = 'none';
            document.getElementById('citySelector').style.display = 'none';
            document.getElementById('notificationIcon').style.display = 'none';
            document.getElementById('chatBackBtn').style.display = 'block';

            // 模拟AI回复
            setTimeout(() => {
                handleAIResponse(message);
            }, 800);
        }

        // 返回首页
        function backToHome() {
            // 隐藏对话消息
            document.getElementById('chatMessages').classList.remove('active');

            // 显示天气、城市、通知，隐藏返回按钮
            document.getElementById('weatherInfo').style.display = 'block';
            document.getElementById('citySelector').style.display = 'block';
            document.getElementById('notificationIcon').style.display = 'block';
            document.getElementById('chatBackBtn').style.display = 'none';

            // 显示欢迎区域和快捷问题
            document.getElementById('aiWelcome').style.display = 'block';
            document.getElementById('quickQuestions').style.display = 'grid';

            // 清空对话历史
            document.getElementById('chatMessages').innerHTML = '';
        }

        // 快捷问题点击
        function askQuickQuestion(question) {
            aiInput.value = question;
            sendBtn.disabled = false;
            sendMessage();
        }

        // 添加消息到对话区
        function addMessage(type, content, planData = null) {
            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${type}`;

            const avatar = document.createElement('div');
            avatar.className = `message-avatar ${type}`;
            avatar.textContent = type === 'ai' ? '🤖' : '👤';

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';

            if (type === 'ai' && planData) {
                // AI消息包含出行方案
                messageContent.innerHTML = content;
                const planCard = createTravelPlanCard(planData);
                messageContent.appendChild(planCard);
            } else {
                messageContent.textContent = content;
            }

            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);

            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // 创建出行方案卡片
        function createTravelPlanCard(planData) {
            const card = document.createElement('div');
            card.className = 'travel-plan-card';

            card.innerHTML = `
                <div class="plan-header">
                    <div class="plan-title">${planData.title}</div>
                    <div class="plan-time">${planData.time}</div>
                </div>
                <div class="plan-route">
                    <div class="route-step">
                        <span class="route-icon">${planData.startIcon}</span>
                        <span>${planData.start}</span>
                    </div>
                    <span class="route-arrow">→</span>
                    <div class="route-step">
                        <span class="route-icon">${planData.endIcon}</span>
                        <span>${planData.end}</span>
                    </div>
                </div>
                <div class="plan-detail">${planData.detail}</div>
                <div class="plan-action">
                    <div class="plan-btn secondary" onclick="showToast('已收藏该方案')">收藏</div>
                    <div class="plan-btn primary" onclick="showRouteDetail('${planData.routeId}')">查看详情</div>
                </div>
            `;

            return card;
        }

        // 处理AI响应（使用真实AI服务）
        async function handleAIResponse(userMessage) {
            try {
                // 显示加载状态
                addMessage('ai', '思考中...');
                const loadingMessage = document.querySelector('.chat-message:last-child');

                // 调用AI服务
                const response = await aiService.sendMessage(userMessage);

                // 移除加载消息
                if (loadingMessage) {
                    loadingMessage.remove();
                }

                // 显示AI回复
                addMessage('ai', response);

            } catch (error) {
                console.error('AI服务调用失败:', error);

                // 移除加载消息
                const loadingMessage = document.querySelector('.chat-message:last-child');
                if (loadingMessage) {
                    loadingMessage.remove();
                }

                // 显示错误提示
                addMessage('ai', '抱歉，AI服务暂时不可用。请稍后再试。');
            }
        }

        // 切换语音输入
        function toggleVoiceInput() {
            const voiceBtn = document.getElementById('voiceBtn');

            if (!isRecording) {
                startVoiceInput(voiceBtn);
            } else {
                stopVoiceInput(voiceBtn);
            }
        }

        // 开始语音输入
        function startVoiceInput(btn) {
            // 检查浏览器是否支持语音识别
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                showToast('您的浏览器不支持语音输入');
                return;
            }

            try {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.lang = 'zh-CN';
                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.onstart = function() {
                    isRecording = true;
                    btn.classList.add('recording');
                    showToast('正在录音...');
                };

                recognition.onresult = function(event) {
                    const transcript = event.results[0][0].transcript;
                    aiInput.value = transcript;
                    sendBtn.disabled = false;
                    showToast('识别成功');
                };

                recognition.onerror = function(event) {
                    showToast('语音识别失败: ' + event.error);
                    stopVoiceInput(btn);
                };

                recognition.onend = function() {
                    stopVoiceInput(btn);
                };

                recognition.start();
            } catch (e) {
                showToast('启动语音输入失败');
                console.error(e);
            }
        }

        // 停止语音输入
        function stopVoiceInput(btn) {
            isRecording = false;
            btn.classList.remove('recording');
            if (recognition) {
                recognition.stop();
            }
        }

        // 显示路线详情
        function showRouteDetail(routeId) {
            showToast('正在跳转到路线详情...');
            // 切换到实时公交模块
            setTimeout(() => {
                switchModule(1);
            }, 500);
        }

        // ==================== 我的模块交互功能 ====================

        // 更换头像
        function changeAvatar() {
            const avatars = ['👤', '😊', '🙂', '😎', '🤓', '😇', '🥳', '🤩', '😺', '🐶', '🐱', '🐻', '🦊', '🐼'];
            const currentAvatar = document.querySelector('.profile-avatar').textContent;
            let newAvatar = avatars[Math.floor(Math.random() * avatars.length)];

            // 确保新头像和当前头像不同
            while (newAvatar === currentAvatar) {
                newAvatar = avatars[Math.floor(Math.random() * avatars.length)];
            }

            document.querySelector('.profile-avatar').textContent = newAvatar;
            showToast('头像已更换!');
        }

        // 编辑个人资料
        function editProfile() {
            const newName = prompt('请输入新的昵称', '优雅的冒险家');
            if (newName && newName.trim()) {
                document.querySelector('.profile-name').textContent = newName.trim();
                showToast('昵称修改成功!');
            }
        }

        // 退出登录
        function logout() {
            if (confirm('确定要退出登录吗?')) {
                showToast('已退出登录');
                // 这里可以添加实际的退出逻辑
                setTimeout(() => {
                    // 重置数据
                    document.querySelector('.profile-name').textContent = '游客';
                    document.querySelectorAll('.stat-number').forEach(el => el.textContent = '0');
                }, 500);
            }
        }

        console.log('智能公交服务平台已加载');
