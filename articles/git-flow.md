% title: git-flow
% date: 2019-10-23

**只是一种规范**

## Master

production-ready,master上不能进行任何commit

## Develop

相当于整合feature分支，所以develop分支应该会有很多bug。通常也不会在develop上面commit，也是通过feature merge上来

## Feature

如果有两个人A/B 去开发一个功能,那么这两个人会从develop分支分出来，合并到develop上

## Release

当develop认为是稳定版本的时候，会拉出release做一个bug-bash之类的，最后再合进master和develop

## Hotfix

当master出现问题的时候拉hotfix，修补好后再合进master