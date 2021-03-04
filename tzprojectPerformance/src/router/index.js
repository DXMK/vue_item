/*
 * @Author: Your name
 * @Date:   2020-12-03 09:54:46
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-19 14:53:42
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/projectApprovalManager',
    component: Layout,
    redirect: '/projectApprovalManager/approvalApply',
    alwaysShow: true, // will always show the root menu
    name: 'projectApprovalManager',
    meta: {
      title: '项目立项',
      icon: 'list',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'approvalApply',
        component: () => import('@/views/projectApprovalManager/approvalApply'),
        name: 'approvalApply',
        meta: {
          title: '项目立项',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      // {
      //   path: 'approvalExamine',
      //   component: () => import('@/views/projectApprovalManager/approvalExamine'),
      //   name: 'approvalExamine',
      //   meta: {
      //     title: '立项审批'
      //   }
      // },
      // {
      //   path: 'projectManager',
      //   component: () => import('@/views/projectApprovalManager/projectManager'),
      //   name: 'projectManager',
      //   meta: {
      //     title: '项目管理',
      //     roles: ['admin']
      //   }
      // },
      // {
      //   path: 'childApprovalExamine',
      //   component: () => import('@/views/projectApprovalManager/childApprovalExamine'),
      //   name: 'childApprovalExamine',
      //   meta: {
      //     title: '项目立项审批',
      //     roles: ['admin']
      //   }
      // },
      {
        path: 'projectLedger',
        component: () => import('@/views/projectApprovalManager/projectLedger'),
        name: 'projectLedger',
        meta: {
          title: '项目台账',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/buildWorkTeam',
    component: Layout,
    redirect: '/buildWorkTeam/approvalApply',
    alwaysShow: true, // will always show the root menu
    name: 'buildWorkTeam',
    meta: {
      title: '组建工作组',
      icon: 'peoples',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'buildWorkGroup',
        name: 'buildWorkGroup',
        component: () => import('@/views/buildWorkTeam/buildWorkGroup'),
        meta: {
          title: '组建工作组',
          roles: ['admin']
        }
      },
      // {
      //   path: 'buildWorkGroupCheck',
      //   name: 'buildWorkGroupCheck',
      //   component: () => import('@/views/buildWorkTeam/buildWorkGroupCheck'),
      //   meta: {
      //     title: '组建绩效工作组审核',
      //     roles: ['admin']
      //   }
      // },
      {
        path: 'buildWorkTask',
        name: 'buildWorkTask',
        component: () => import('@/views/buildWorkTeam/buildWorkTask'),
        meta: {
          title: '明确工作任务'
        }
      },
      // {
      //   path: 'buildWorkTaskCheck',
      //   name: 'buildWorkTaskCheck',
      //   component: () => import('@/views/buildWorkTeam/buildWorkTaskCheck'),
      //   meta: {
      //     title: '明确绩效工作任务审核'
      //   }
      // },
      {
        path: 'buildWorkExpert',
        name: 'buildWorkExpert',
        component: () => import('@/views/buildWorkTeam/buildWorkExpert'),
        meta: {
          title: '组建专家组',
          roles: ['admin']
        }
      },
      // {
      //   path: 'buildWorkExpertCheck',
      //   name: 'buildWorkExpertCheck',
      //   component: () => import('@/views/buildWorkTeam/buildWorkExpertCheck'),
      //   meta: {
      //     title: '组建绩效专家组审核',
      //     roles: ['admin']
      //   }
      // },
      {
        path: 'buildWorkBook',
        name: 'buildWorkBook',
        component: () => import('@/views/buildWorkTeam/buildWorkBook'),
        meta: {
          title: '工作组台账',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/dataCollection',
    name: 'dataCollection',
    component: Layout,
    redirect: '/dataCollection/approvalApply',
    alwaysShow: true,
    meta: {
      title: '资料收集',
      icon: 'documentation',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'protocolDetailList',
        name: 'protocolDetailList',
        component: () => import('@/views/dataCollection/protocolDetailList'),
        meta: {
          title: '资料清单拟定',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'protocolAudit',
        name: 'protocolAudit',
        component: () => import('@/views/dataCollection/protocolAudit'),
        meta: {
          title: '资料清单审核'
        }
      },
      {
        path: 'infoUpload',
        name: 'infoUpload',
        component: () => import('@/views/dataCollection/infoUpload'),
        meta: {
          title: '资料收集上传',
          roles: ['admin']
        }
      },
      {
        path: 'infoAudit',
        name: 'infoAudit',
        component: () => import('@/views/dataCollection/infoAudit'),
        meta: {
          title: '资料收集审核',
          roles: ['admin']
        }
      },
      {
        path: 'bookCollection',
        name: 'bookCollection',
        component: () => import('@/views/dataCollection/bookCollection'),
        meta: {
          title: '资料台账',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/schemeMake',
    name: 'schemeMake',
    component: Layout,
    redirect: '/schemeMake/indexDesign',
    alwaysShow: true,
    meta: { title: '方案制定', icon: 'edit', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'indexDesign',
        name: 'indexDesign',
        component: () => import('@/views/schemeMake/indexDesign'),
        meta: { title: '指标体系设计', roles: ['admin'] }
      }, {
        path: 'indexDesignCheck',
        name: 'indexDesignCheck',
        component: () => import('@/views/schemeMake/indexDesignCheck'),
        meta: { title: '指标体系审核', roles: ['admin'] }
      },
      // {
      //   path: 'indexDesignMaintain',
      //   name: 'indexDesignMaintain',
      //   component: () => import('@/views/schemeMake/indexDesignMaintain'),
      //   meta: { title: '指标体系设计维护', roles: ['admin'] }
      // },
      {
        path: 'draftDesign',
        name: 'draftDesign',
        hidden: false,
        component: () => import('@/views/schemeMake/draftDesign'),
        meta: { title: '指标底稿设计', id: 'traffic-user-list' }
      }, {
        path: 'otherdraftDesign',
        name: 'otherdraftDesign',
        hidden: false,
        component: () => import('@/views/schemeMake/otherdraftDesign'),
        meta: { title: '其他底稿设计', id: 'traffic-user-list' }
      }, {
        path: 'draftDesignCheck',
        name: 'draftDesignCheck',
        hidden: false,
        component: () => import('@/views/schemeMake/draftDesignCheck'),
        meta: { title: '底稿设计审核', id: 'traffic-user-list' }
      },
      {
        path: 'beforehandResearch',
        name: 'beforehandResearch',
        alwaysShow: true,
        hidden: false,
        component: () => import('@/views/schemeMake/beforehandResearch'),
        redirect: '/schemeMake/beforehandResearch/researchPlan',
        meta: { title: '预调研', roles: ['admin'] },
        children: [
          {
            path: 'researchPlan',
            name: 'researchPlan',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/researchPlan'),
            meta: { title: '拟定调研安排', id: 'traffic-user-list' }
          }, {
            path: 'researchPlanCheck',
            name: 'researchPlanCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/researchPlanCheck'),
            meta: { title: '审核调研安排', id: 'traffic-user-list' }
          }, {
            path: 'outlineList',
            name: 'outlineList',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/outlineList'),
            meta: { title: '拟定调研提纲', id: 'traffic-user-list' }
          }, {
            path: 'outlineListCheck',
            name: 'outlineListCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/outlineListCheck'),
            meta: { title: '审核调研提纲', id: 'traffic-user-list' }
          }, {
            path: 'researchLetter',
            name: 'researchLetter',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/researchLetter'),
            meta: { title: '拟定调研函', id: 'traffic-user-list' }
          }, {
            path: 'researchLetterCheck',
            name: 'researchLetterCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/researchLetterCheck'),
            meta: { title: '审核调研函', id: 'traffic-user-list' }
          }, {
            path: 'researchQuestion',
            name: 'researchQuestion',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/researchQuestion'),
            meta: { title: '拟定调查问卷', id: 'traffic-user-list' }
          }, {
            path: 'researchQuestionCheck',
            name: 'researchQuestionCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/researchQuestionCheck'),
            meta: { title: '审核调查问卷', id: 'traffic-user-list' }
          }, {
            path: 'draftWrite',
            name: 'draftWrite',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/draftWrite'),
            meta: { title: '底稿填写', id: 'traffic-user-list' }
          }, {
            path: 'draftWriteCheck',
            name: 'draftWriteCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/beforehandResearch/draftWriteCheck'),
            meta: { title: '底稿填写审核', id: 'traffic-user-list' }
          }
        ]
      },
      {
        path: 'makeCompile',
        name: 'makeCompile',
        alwaysShow: true,
        hidden: false,
        component: () => import('@/views/schemeMake/makeCompile'),
        redirect: '/schemeMake/makeCompile/schemeCompile',
        meta: { title: '编制评价方案', roles: ['admin'] },
        children: [
          {
            path: 'researchPlan',
            name: 'researchPlan',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/researchPlan'),
            meta: { title: '拟定调研安排', id: 'traffic-user-list' }
          }, {
            path: 'researchPlanCheck',
            name: 'researchPlanCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/researchPlanCheck'),
            meta: { title: '审核调研安排', id: 'traffic-user-list' }
          }, {
            path: 'outlineList',
            name: 'outlineList',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/outlineList'),
            meta: { title: '拟定调研提纲', id: 'traffic-user-list' }
          }, {
            path: 'outlineListCheck',
            name: 'outlineListCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/outlineListCheck'),
            meta: { title: '审核调研提纲', id: 'traffic-user-list' }
          }, {
            path: 'researchLetter',
            name: 'researchLetter',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/researchLetter'),
            meta: { title: '拟定调研函', id: 'traffic-user-list' }
          }, {
            path: 'researchLetterCheck',
            name: 'researchLetterCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/researchLetterCheck'),
            meta: { title: '审核调研函', id: 'traffic-user-list' }
          }, {
            path: 'researchQuestion',
            name: 'researchQuestion',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/researchQuestion'),
            meta: { title: '拟定调查问卷', id: 'traffic-user-list' }
          }, {
            path: 'researchQuestionCheck',
            name: 'researchQuestionCheck',
            hidden: false,
            component: () => import('@/views/schemeMake/makeCompile/researchQuestionCheck'),
            meta: { title: '审核调查问卷', id: 'traffic-user-list' }
          }, {
            path: 'schemeCompile',
            name: 'schemeCompile',
            component: () => import('@/views/schemeMake/makeCompile/schemeCompile'),
            meta: { title: '编制评价工作方案', roles: ['admin'] }
          }
        ]
      },
      {
        path: 'schemeCompileCheck',
        name: 'schemeCompileCheck',
        component: () => import('@/views/schemeMake/schemeCompileCheck'),
        meta: { title: '审核评价方案', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/evaluateImplement',
    name: 'evaluateImplement',
    component: Layout,
    redirect: '/evaluateImplement/siteResearch',
    alwaysShow: true,
    meta: {
      title: '评价实施',
      icon: 'education',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'siteResearch',
        name: 'siteResearch',
        alwaysShow: true,
        hidden: false,
        component: () => import('@/views/evaluateImplement/siteResearch'),
        redirect: '/evaluateImplement/siteResearch/researchLetter',
        meta: { title: '现场调研', roles: ['admin'] },
        children: [
          // {
          //   path: 'researchLetter',
          //   name: 'researchLetter',
          //   hidden: false,
          //   component: () => import('@/views/evaluateImplement/siteResearch/researchLetter'),
          //   meta: { title: '拟定调研函', id: 'traffic-user-list' }
          // }, {
          //   path: 'researchLetterCheck',
          //   name: 'researchLetterCheck',
          //   hidden: false,
          //   component: () => import('@/views/evaluateImplement/siteResearch/researchLetterCheck'),
          //   meta: { title: '审核调研函', id: 'traffic-user-list' }
          // },
          {
            path: 'draftWrite',
            name: 'draftWrite',
            hidden: false,
            component: () => import('@/views/evaluateImplement/siteResearch/draftWrite'),
            meta: { title: '底稿填写', id: 'traffic-user-list' }
          }, {
            path: 'draftWriteCheck',
            name: 'draftWriteCheck',
            hidden: false,
            component: () => import('@/views/evaluateImplement/siteResearch/draftWriteCheck'),
            meta: { title: '底稿填写审核', id: 'traffic-user-list' }
          }]
      },
      // {
      //   path: 'completeIndex',
      //   name: 'completeIndex',
      //   component: () => import('@/views/evaluateImplement/completeIndex'),
      //   meta: { title: '完善指标体系', roles: ['admin'] }
      // },
      // {
      //   path: 'completeIndexCheck',
      //   name: 'completeIndexCheck',
      //   component: () => import('@/views/evaluateImplement/completeIndexCheck'),
      //   meta: { title: '审核指标体系', roles: ['admin'] }
      // },
      // {
      //   path: 'collectAnalyse',
      //   name: 'collectAnalyse',
      //   component: () => import('@/views/evaluateImplement/collectAnalyse'),
      //   meta: { title: '调研分析结果上传', roles: ['admin'] }
      // },
      {
        path: 'problemCollect',
        name: 'problemCollect',
        component: () => import('@/views/evaluateImplement/problemCollect'),
        meta: { title: '初步问题汇总', roles: ['admin'] }
      },
      {
        path: 'verdictWrite',
        name: 'verdictWrite',
        component: () => import('@/views/evaluateImplement/verdictWrite'),
        meta: { title: '初步评价结论编写', roles: ['admin'] }
      },
      {
        path: 'verdictWriteCheck',
        name: 'verdictWriteCheck',
        component: () => import('@/views/evaluateImplement/verdictWriteCheck'),
        meta: { title: '评价结论审核', roles: ['admin'] }
      }
    ]
  },
  // 报告编写
  {
    path: '/reportWrite',
    component: Layout,
    redirect: '/reportWrite/writeReport',
    alwaysShow: true, // will always show the root menu
    name: 'reportWrite',
    meta: {
      title: '报告编写',
      icon: 'guide',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'writeReport',
        name: 'writeReport',
        component: () => import('@/views/reportWrite/writeReport'),
        meta: {
          title: '编写评价报告',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'approvalReport',
        name: 'approvalReport',
        component: () => import('@/views/reportWrite/approvalReport'),
        meta: {
          title: '审核评价报告',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  // 工作总结
  {
    path: '/summaryWork',
    component: Layout,
    redirect: '/summaryWork/writeSummary',
    alwaysShow: true, // will always show the root menu
    name: 'summaryWork',
    meta: {
      title: '工作总结',
      icon: 'nested',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'writeSummary',
        name: 'writeSummary',
        component: () => import('@/views/summaryWork/writeSummary'),
        meta: { title: '编写工作总结', roles: ['admin'] }
      },
      {
        path: 'approvalSummary',
        name: 'approvalSummary',
        component: () => import('@/views/summaryWork/approvalSummary'),
        meta: { title: '审核工作总结', roles: ['admin'] }
      }
    ]
  },
  // 归档管理
  {
    path: '/pigeonholeManage',
    component: Layout,
    redirect: '/pigeonholeManage/financial',
    alwaysShow: true, // will always show the root menu
    name: 'pigeonholeManage',
    meta: {
      title: '归档管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'financial',
        name: 'financial',
        component: () => import('@/views/pigeonholeManage/financial'),
        meta: {
          title: '整理档案',
          roles: ['admin']
        }
      },
      {
        path: 'otherItems',
        name: 'otherItems',
        component: () => import('@/views/pigeonholeManage/otherItems'),
        meta: {
          title: '档案审核',
          roles: ['admin']
        }
      }
    ]
  },
  // 专家
  {
    path: '/profarssorManager',
    name: 'profarssorManager',
    component: Layout,
    redirect: '/profarssorManager/profarssorOperation',
    alwaysShow: true,
    meta: { title: '专家管理', icon: 'people', roles: ['admin', 'editor'] },
    children: [
      {
        path: 'profarssorOperation',
        name: 'profarssorOperation',
        component: () => import('@/views/profarssorManager/profarssorOperation'),
        meta: { title: '指标体系审核', roles: ['admin'] }
      }, {
        path: 'profarssorTake',
        name: 'profarssorTake',
        component: () => import('@/views/profarssorManager/profarssorTake'),
        meta: { title: '评价方案(项目组审核后)', roles: ['admin'] }
      }, {
        path: 'profarssorForm',
        name: 'profarssorForm',
        component: () => import('@/views/profarssorManager/profarssorForm'),
        meta: { title: '评价报告(项目组审核后)', roles: ['admin'] }
      }
    ]
  },
  // 数据库更新
  {
    path: '/databaseUpdate',
    name: '/databaseUpdate',
    component: Layout,
    redirect: '/databaseUpdate/inStorage',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '数据库管理',
      icon: 'eye-open',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      // {
      //   path: 'inStorage',
      //   name: 'inStorage',
      //   component: () => import('@/views/databaseUpdate/inStorage'),
      //   meta: { title: '数据库入库申请', roles: ['admin'] }
      // },
      // {
      //   path: 'inStorageCheck',
      //   name: 'inStorageCheck',
      //   component: () => import('@/views/databaseUpdate/inStorageCheck'),
      //   meta: { title: '数据库入库审核', roles: ['admin'] }
      // },
      // {
      //   path: 'outStorage',
      //   name: 'outStorage',
      //   component: () => import('@/views/databaseUpdate/outStorage'),
      //   meta: { title: '数据库出库申请', roles: ['admin'] }
      // },
      // {
      //   path: 'outStorageCheck',
      //   name: 'outStorageCheck',
      //   component: () => import('@/views/databaseUpdate/outStorageCheck'),
      //   meta: { title: '数据库出库审核', roles: ['admin'] }
      // },
      // {
      //   path: 'storageUpdate',
      //   name: 'storageUpdate',
      //   component: () => import('@/views/databaseUpdate/storageUpdate'),
      //   meta: { title: '数据库修改申请', roles: ['admin'] }
      // },
      // {
      //   path: 'storageUpdateCheck',
      //   name: 'storageUpdateCheck',
      //   component: () => import('@/views/databaseUpdate/storageUpdateCheck'),
      //   meta: { title: '数据库修改审核', roles: ['admin'] }
      // },
      // {
      //   path: 'storageBook',
      //   name: 'storageBook',
      //   component: () => import('@/views/databaseUpdate/storageBook'),
      //   meta: { title: '数据库台账', roles: ['admin'] }
      // },
      {
        path: 'policylaw',
        component: () => import('@/views/databaseUpdate/policylaw'),
        name: 'policylaw',
        meta: { title: '政策法规库' }
      },
      {
        path: 'perforIndex',
        component: () => import('@/views/databaseUpdate/perforIndex'),
        name: 'perforIndex',
        meta: { title: '绩效指标库' }
      },
      {
        path: 'projectPersonnel',
        component: () => import('@/views/databaseUpdate/projectPersonnel'),
        name: 'projectPersonnel',
        meta: { title: '项目人员库' }
      },
      {
        path: 'projectSpecialist',
        component: () => import('@/views/databaseUpdate/projectSpecialist'),
        name: 'projectSpecialist',
        meta: { title: '项目专家库' }
      },
      {
        path: 'projectPerformance',
        component: () => import('@/views/databaseUpdate/projectPerformance'),
        name: 'projectPerformance',
        meta: { title: '项目业绩库' }
      },
      {
        path: 'projectCase',
        component: () => import('@/views/databaseUpdate/projectCase'),
        name: 'projectCase',
        meta: { title: '项目案例库' }
      },
      {
        path: 'dataFile',
        name: 'dataFile',
        component: () => import('@/views/databaseUpdate/dataFile'),
        meta: { title: '投标应答文件库' }
      },
      {
        path: 'applyApprovel',
        name: 'applyApprovel',
        component: () => import('@/views/databaseUpdate/applyApprovel'),
        meta: { title: '数据更新申请' }
      },
      {
        path: 'updateApprovel',
        name: 'updateApprovel',
        component: () => import('@/views/databaseUpdate/updateApprovel'),
        meta: { title: '数据更新审批' }
      },
      {
        path: 'checkApprovel',
        name: 'checkApprovel',
        component: () => import('@/views/databaseUpdate/checkApprovel'),
        meta: { title: '数据审阅申请' }
      },
      {
        path: 'ApprovelCheck',
        name: 'ApprovelCheck',
        component: () => import('@/views/databaseUpdate/approvelCheck'),
        meta: { title: '数据审阅审批' }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
