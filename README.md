# TollFramework
A framework for configuring a 3d based toll-gate web application

Internal JS lib --scripts.js-- contains functions for initializing entire scene and loading models. DO NOT EDIT UNLESS NEEDED.


INTERFACES:

The function --doubleClick()-- located in JsonLoader.js is required to be defined for implementing the function while double clicking on icons (e.g.cameras).

Framework utilizes JSON files for configuring toll gates layout. A json template can be found in res/json folder.
parent_template.html illustrates a way of loading several json files for different toll gate configurations.

内部JS库--scripts.js--包含初始化场景及载入模型的方法。如无特殊需要，无需更改。

接口：

定义在“JsonLoader.js”文件中的方法“doubleClick()”，提供了点击设备的接口。
框架使用JSON文件配置模型布局。可以在res/json文件夹内找到template.json模板。
parent_template.html演示了如何载入不同json配置文件。