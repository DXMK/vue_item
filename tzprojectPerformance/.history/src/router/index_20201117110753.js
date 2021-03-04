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
      title: '立项管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'approvalApply',
        component: () => import('@/views/projectApprovalManager/approvalApply'),
        name: 'approvalApply',
        meta: {
          title: '立项申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'approvalExamine',
        component: () => import('@/views/projectApprovalManager/approvalExamine'),
        name: 'approvalExamine',
        meta: {
          title: '立项审批'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'projectManager',
        component: () => import('@/views/projectApprovalManager/projectManager'),
        name: 'projectManager',
        meta: {
          title: '项目管理',
          roles: ['admin']
        }
      },
      {
        path: 'childApprovalExamine',
        component: () => import('@/views/projectApprovalManager/childApprovalExamine'),
        name: 'childApprovalExamine',
        meta: {
          title: '子项目立项审批',
          roles: ['admin']
        }
      },
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
      title: '工作组管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'buildWorkGroup',
        name: 'buildWorkGroup',
        component: () => import('@/views/buildWorkTeam/buildWorkGroup'),
        meta: {
          title: '组建工作组',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'buildWorkTask',
        name: 'buildWorkTask',
        component: () => import('@/views/buildWorkTeam/buildWorkTask'),
        meta: {
          title: '明确工作任务'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'buildWorkExpert',
        name: 'buildWorkExpert',
        component: () => import('@/views/buildWorkTeam/buildWorkExpert'),
        meta: {
          title: '专家组信息',
          roles: ['admin']
        }
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
      icon: 'lock',
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
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'writeSummary',
        name: 'writeSummary',
        component: () => import('@/views/summaryWork/writeSummary'),
        meta: {
          title: '编写工作总结',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'approvalSummary',
        name: 'approvalSummary',
        component: () => import('@/views/summaryWork/approvalSummary'),
        meta: {
          title: '审核工作总结',
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
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'writeSummary',
        name: 'writeSummary',
        component: () => import('@/views/summaryWork/writeSummary'),
        meta: {
          title: '编写工作总结',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'approvalSummary',
        name: 'approvalSummary',
        component: () => import('@/views/summaryWork/approvalSummary'),
        meta: {
          title: '审核工作总结',
          roles: ['admin'] // or you can only set roles in sub nav
        }
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
